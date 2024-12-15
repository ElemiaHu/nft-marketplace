// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTAuction is ReentrancyGuard {
    struct Auction {
        address seller;
        address nft;
        uint256 tokenId;
        uint256 startPrice;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        bool ended;
    }

    Auction[] public auctions;
    mapping(uint256 => mapping(address => uint256)) public bids;

    event AuctionCreated(uint256 indexed auctionId, address seller, address nft, uint256 tokenId, uint256 startPrice, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, address bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address winner, uint256 amount);

    function createAuction(
        address _nft,
        uint256 _tokenId,
        uint256 _startPrice,
        uint256 _duration
    ) external {
        IERC721 nftContract = IERC721(_nft);
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not NFT owner");
        require(
            nftContract.getApproved(_tokenId) == address(this) 
            || nftContract.isApprovedForAll(msg.sender, address(this)),
            "Auction contract not approved to transfer NFT"
        );

        uint256 endTime = block.timestamp + _duration;
        auctions.push(Auction({
            seller: msg.sender,
            nft: _nft,
            tokenId: _tokenId,
            startPrice: _startPrice,
            highestBid: 0,
            highestBidder: address(0),
            endTime: endTime,
            ended: false
        }));

        uint256 auctionId = auctions.length - 1;
        emit AuctionCreated(auctionId, msg.sender, _nft, _tokenId, _startPrice, endTime);
    }

    function bid(uint256 _auctionId) external payable nonReentrant {
        Auction storage auction = auctions[_auctionId];
        require(block.timestamp < auction.endTime, "Auction ended");
        uint256 newBid = bids[_auctionId][msg.sender] + msg.value;
        uint256 minBid = auction.highestBid == 0 ? auction.startPrice : auction.highestBid;
        require(newBid > minBid, "Bid not high enough");

        bids[_auctionId][msg.sender] = newBid;

        if (newBid > auction.highestBid) {
            auction.highestBid = newBid;
            auction.highestBidder = msg.sender;
        }

        emit BidPlaced(_auctionId, msg.sender, newBid);
    }

    function endAuction(uint256 _auctionId) external nonReentrant {
        Auction storage auction = auctions[_auctionId];
        require(block.timestamp >= auction.endTime, "Auction not ended yet");
        require(!auction.ended, "Auction already ended");
        auction.ended = true;

        IERC721 nftContract = IERC721(auction.nft);

        if (auction.highestBidder != address(0)) {
            nftContract.transferFrom(auction.seller, auction.highestBidder, auction.tokenId);
            payable(auction.seller).transfer(auction.highestBid);
        }
        // If no one bid, NFT remains with the seller

        emit AuctionEnded(_auctionId, auction.highestBidder, auction.highestBid);
    }
}