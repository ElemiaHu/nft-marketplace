// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract Auction {
  address public immutable owner;
  event AssetTransferred(address tokenContract, uint256 tokenId, address from, address to);

  struct Auction {
    address tokenContract;
    uint256 tokenId;
    uint256 createdTime;
    address seller;
    uint256 startTime;
    uint256 endOfBiddingPeriod;
    uint256 endOfRevealPeriod;
    // =====================
    uint64 numUnrevealedBids;
    uint96 highestBid;
    uint96 secondHighestBid;
    // =====================
    address highestBidder;
    uint64 index;
    address erc20Token;
  }

  Auction[] auctionArray;

  struct Bid {
    bytes20 commitment;
    uint96 collateral;
  }

  mapping(address => mapping(uint256 => Auction)) public auctions;

  mapping(
    address // ERC721 token contract
      => mapping(
        uint256 // ERC721 token ID
          => mapping(
          uint64 // Auction index
            => mapping(address // Bidder
              => Bid
        )
      )
    )
  ) public bids;

    constructor(address _owner) {
      owner = _owner;
    }

  function createAuction(
    address tokenContract,
    uint256 tokenId,
    address erc20Token,
    uint256 startTime,
    uint256 bidPeriod,
    uint256 revealPeriod,
    uint96 reservePrice
  ) public virtual {
    require(startTime > block.timestamp, "Auction must start in the future");
    require(auctions[tokenContract][tokenId].startTime == 0, "Auction already exists for this asset");
    require(bidPeriod > 0, "Bid period must be greater than 0");
    require(revealPeriod > 0, "Reveal period must be greater than 0");
    // Calculate the end time of the bidding period
    uint256 endOfBiddingPeriod = startTime + bidPeriod;
    // Calculate the end time of the reveal period
    uint256 endOfRevealPeriod = endOfBiddingPeriod + revealPeriod;
    // Create a new auction with the provided parameters
    Auction storage newAuction = auctions[tokenContract][tokenId];
    newAuction.tokenContract = tokenContract;
    newAuction.tokenId = tokenId;
    newAuction.createdTime = block.timestamp;
    newAuction.seller = msg.sender;
    newAuction.startTime = startTime;
    newAuction.endOfBiddingPeriod = endOfBiddingPeriod;
    newAuction.endOfRevealPeriod = endOfRevealPeriod;
    newAuction.numUnrevealedBids = 0;
    newAuction.highestBid = reservePrice;
    newAuction.secondHighestBid = reservePrice;
    newAuction.highestBidder = msg.sender; // If no bids exceed reservePrice, the highestBidder is the seller
    newAuction.index =  auctions[tokenContract][tokenId].index + 1;
    newAuction.erc20Token = erc20Token;
    auctionArray.push(newAuction);
  }

  function commitBid(address tokenContract, uint256 tokenId, bytes20 commitment, uint256 erc20Tokens) external {
    // Retrieve the auction details
    Auction storage auction = auctions[tokenContract][tokenId];

    // Ensure that the auction for the specified item exists
    require(auction.startTime > 0, "Auction does not exist for this item");

    // Ensure that the bidding period is still active
    require(block.timestamp >= auction.startTime, "Bidding period has not started yet");
    require(block.timestamp <= auction.endOfBiddingPeriod, "Bidding period has ended");

    // Ensure that the commitment is not empty
    require(commitment != bytes20(0), "Commitment cannot be empty");

    // Ensure the provided collateral is greater than or equal to the minimum required collateral
    require(erc20Tokens > 0, "Insufficient collateral");

    // Transfer the ERC20 tokens from the bidder to the auction contract address as collateral
    IERC20(auction.erc20Token).transferFrom(msg.sender, address(this), erc20Tokens);

    // Store or update the bid in the bids mapping
    bids[tokenContract][tokenId][auction.index][msg.sender] = Bid({
      commitment: commitment,
      collateral: uint96(erc20Tokens)
    });

    // Increase the count of unrevealed bids
    auction.numUnrevealedBids++;
  }

  function revealBid(address tokenContract, uint256 tokenId, uint96 bidValue, bytes32 nonce) external {
    Auction storage auction = auctions[tokenContract][tokenId];

    // Ensure that the auction for the specified item exists
    require(auction.startTime > 0, "Auction does not exist for this item");

    // Ensure the bidding period has ended
    require(block.timestamp >= auction.endOfBiddingPeriod, "Bidding period has not ended yet");
    
    // Ensure the revealing period has not ended
    require(block.timestamp < auction.endOfRevealPeriod, "Reveal period has ended");

    // Fetch the bid commitment
    Bid storage bid = bids[tokenContract][tokenId][auction.index][msg.sender];
    require(bid.commitment != bytes20(0), "No commitment found for this bidder");

    // Ensure that the revealed bid matches the commitment
    require(bytes20(keccak256(abi.encode(nonce, bidValue, tokenContract, tokenId, auction.index))) == bid.commitment, "Invalid bid reveal");
    
    // Ensure collateral is enough for bidding
    require(bidValue <= bid.collateral, "Not enough collateral");
    
    // Update the auction state, reveal the second highest bid
    auction.numUnrevealedBids -= 1;
    if (bidValue > auction.highestBid) {
      auction.secondHighestBid = auction.highestBid;
      auction.highestBid = bidValue;
      auction.highestBidder = msg.sender;
    } else if (bidValue > auction.secondHighestBid) {
      auction.secondHighestBid = bidValue;
    }
  }

  function endAuction(address tokenContract, uint256 tokenId) external {
    Auction storage auction = auctions[tokenContract][tokenId];

    // Ensure that the auction for the specified item exists
    require(auction.startTime > 0, "Auction does not exist for this item");

    // Ensure the bidding period is over
    require(block.timestamp > auction.endOfRevealPeriod, "Revealing period is not over");

    // Ensure all bids are revealed
    require(auction.numUnrevealedBids == 0, "Not all bids are revealed");

    // Ensure secondHighestBid is not reservePrice
    if (auction.highestBidder != auction.seller) {
      // Transfer the asset to winning bidder
      emit AssetTransferred(tokenContract, tokenId, auction.seller, auction.highestBidder);
      IERC721(tokenContract).safeTransferFrom(address(this), auction.highestBidder, tokenId);

      // Disburse the auction proceeds to the seller
      IERC20(auction.erc20Token).transfer(auction.seller, auction.secondHighestBid);

      // Return extra collateral to the winning bidder
      Bid storage winningBid = bids[tokenContract][tokenId][auction.index][auction.highestBidder];
      uint96 excessCollateral = winningBid.collateral - auction.secondHighestBid;
      if (excessCollateral > 0) {
        IERC20(auction.erc20Token).transfer(auction.highestBidder, excessCollateral);
      }
    } else {
      // Emit the AssetTransferred event
      emit AssetTransferred(tokenContract, tokenId, address(this), auction.seller);

      // If there is no bidder exceeded the auction's reserve price
      IERC721(tokenContract).safeTransferFrom(address(this), auction.seller, tokenId);
    }
  }

  function withdrawCollateral(address tokenContract, uint256 tokenId, uint64 auctionIndex) external {
    Auction storage auction = auctions[tokenContract][tokenId];
    Bid storage bid = bids[tokenContract][tokenId][auctionIndex][msg.sender];

    // Ensure the revealing peiod has ended
    require(block.timestamp > auction.endOfRevealPeriod, "Reveal period has not ended");
    
    // Ensure bidder has not withdrawn their collateral
    require(bid.commitment != bytes20(0), "No commitment found for this bidder");
    require(bid.collateral > 0, "No collateral needs to be withdrawn");

    // Return the collateral to not winning bidders
    require(msg.sender != auction.highestBidder, "Cannot withdraw collateral to the winning bidder");
    IERC20(auction.erc20Token).transfer(msg.sender, bid.collateral);
    // Clear the bid to prevent multiple withdrawals
    bids[tokenContract][tokenId][auctionIndex][msg.sender] = Bid(bytes20(0), 0);
  }

  function getAuction(address tokenContract, uint256 tokenId) public view returns (Auction memory auction) {
    return auctions[tokenContract][tokenId];
  }
  function getAuctionArray() public view returns (Auction[] memory) {
    return auctionArray;
  }

  function getBid(address tokenContract, uint256 tokenId, uint64 auctionIndex, address bidder) public view returns (Bid memory bid) {
    Auction storage auction = auctions[tokenContract][tokenId];
    return bids[tokenContract][tokenId][auctionIndex][bidder];
  }
}