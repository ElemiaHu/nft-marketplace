// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Auction} from "../contracts/Auction.sol";
import {ERC20Token} from "../contracts/ERC20Token.sol";
import {ERC721Token} from "../contracts/ERC721Token.sol";
import {console} from "forge-std/console.sol";


contract AuctionTest is Test {
  Auction public auction;
  ERC20Token public erc20Token;
  ERC721Token public erc721Token;

  address deployer = makeAddr("deployer");
  address seller = makeAddr("seller");
  address alice = makeAddr("alice");

  address auctionAddress;
  address erc20TokenAddress;
  address erc721TokenAddress;

  uint tokenId = 0;
  uint256 bidPeriod = 60; // 60 s
  uint256 revealPeriod = 180; // 3 min

  uint256 nonce = 0;
  
  function setUp() public {
    auction = new Auction(deployer);
    erc20Token = new ERC20Token("NEU Token", "NEU", 18, 1_000_000 ether, deployer);
    erc721Token = new ERC721Token("Chiikwa", "CKW", deployer);

    auctionAddress = address(auction);
    erc20TokenAddress = address(erc20Token);
    erc721TokenAddress = address(erc721Token);

    // Mint ERC20 and ERC721 tokens to the seller
    erc20Token.mint(seller, 300 ether);
    erc20Token.mint(alice, 500 ether);

    
    vm.startPrank(deployer); // Deployer performs minting as it is the owner
    erc721Token.mint(seller, "abc.png");
    vm.stopPrank();
    
    // Approve Auction to handle seller's ERC721 tokens
    // vm.prank(seller);
    // erc721Token.approve(auctionAddress, tokenId);
  }

function test_createAuction() public {
    vm.prank(seller);
    uint256 startTime = block.timestamp + 10; // auction starts in 10 seconds
    auction.createAuction(
      erc721TokenAddress,
      tokenId,
      erc20TokenAddress,
      startTime,
      bidPeriod,
      revealPeriod,
      1 ether
    );

    // Retrieve the auction struct
    Auction.Auction memory createdAuction = auction.getAuction(erc721TokenAddress, tokenId);

    // Assertions for individual fields
    assertEq(createdAuction.seller, seller);
    assertEq(createdAuction.startTime, startTime);
    assertEq(createdAuction.endOfBiddingPeriod, startTime + bidPeriod);
    assertEq(createdAuction.endOfRevealPeriod, startTime + bidPeriod + revealPeriod);
    assertEq(createdAuction.numUnrevealedBids, 0);
    assertEq(createdAuction.highestBid, 1 ether);
    assertEq(createdAuction.secondHighestBid, 1 ether);
    assertEq(createdAuction.highestBidder, seller); // Likely no highest bidder yet
    assertEq(createdAuction.index, 1);
  }

  function test_commitBid() public {
    // Create an auction
    vm.prank(seller);
    uint256 startTime = block.timestamp + 10; // auction starts in 10 seconds
    auction.createAuction(
      erc721TokenAddress,
      tokenId,
      erc20TokenAddress,
      startTime,
      bidPeriod,
      revealPeriod,
      1 ether
    );

    vm.warp(startTime + 10); // start bidding 30 seconds after auction begins

    // Retrieve the auction struct
    Auction.Auction memory createdAuction = auction.getAuction(erc721TokenAddress, tokenId);
    console.log(createdAuction.highestBid);
    
    // Commit the bid with a collateral of 30
    vm.startPrank(alice);
    uint256 aliceBid = 5;
    uint256 collateral = 30 ether;
    bytes20 commitment = bytes20(keccak256(abi.encode(nonce, aliceBid, erc721TokenAddress, tokenId, createdAuction.index)));
    erc20Token.approve(auctionAddress, collateral);
    auction.commitBid(erc721TokenAddress, tokenId, commitment, collateral);
    Auction.Bid memory bid =  auction.getBid(erc721TokenAddress, tokenId, createdAuction.index,alice);

    createdAuction = auction.getAuction(erc721TokenAddress, tokenId);
    console.log(createdAuction.highestBid);
    assertEq(bid.commitment, commitment);
    assertEq(bid.collateral, collateral);
  }

  function testBlockTimestamp() public {
    uint256 currentTimestamp = block.timestamp;
    console.log("Current Block Timestamp:", currentTimestamp);

    // Simulate time warp if needed
    vm.warp(currentTimestamp + 100);
    console.log("Warped Block Timestamp:", block.timestamp);
  }

}