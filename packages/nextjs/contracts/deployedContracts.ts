/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  114516: {
    NFTFactory: {
      address: "0x6eB76bC997D39114A5bD392a974883e0D4e2bdb4",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_owner",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "allCollections",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "collections",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "createCollection",
          inputs: [
            {
              name: "name",
              type: "string",
              internalType: "string",
            },
            {
              name: "symbol",
              type: "string",
              internalType: "string",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getAllCollections",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "address[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getCollectionInfo",
          inputs: [
            {
              name: "collectionAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "CollectionCreated",
          inputs: [
            {
              name: "collectionAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "deployer",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "name",
              type: "string",
              indexed: false,
              internalType: "string",
            },
            {
              name: "symbol",
              type: "string",
              indexed: false,
              internalType: "string",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
    Auction: {
      address: "0x0365b4fd1679C4046Bc51254B0BA2AAdF0Fe1137",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_owner",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "auctions",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "createdTime",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "seller",
              type: "address",
              internalType: "address",
            },
            {
              name: "startTime",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "endOfBiddingPeriod",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "endOfRevealPeriod",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "numUnrevealedBids",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "highestBid",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "secondHighestBid",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "highestBidder",
              type: "address",
              internalType: "address",
            },
            {
              name: "index",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "erc20Token",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "bids",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "commitment",
              type: "bytes20",
              internalType: "bytes20",
            },
            {
              name: "collateral",
              type: "uint96",
              internalType: "uint96",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "commitBid",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "commitment",
              type: "bytes20",
              internalType: "bytes20",
            },
            {
              name: "bidValue",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createAuction",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "erc20Token",
              type: "address",
              internalType: "address",
            },
            {
              name: "startTime",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "bidPeriod",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "revealPeriod",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "reservePrice",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "endAuction",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getAuction",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "auction",
              type: "tuple",
              internalType: "struct Auction.Auction",
              components: [
                {
                  name: "tokenContract",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenId",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "createdTime",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "startTime",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "endOfBiddingPeriod",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "endOfRevealPeriod",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "numUnrevealedBids",
                  type: "uint64",
                  internalType: "uint64",
                },
                {
                  name: "highestBid",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "secondHighestBid",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "highestBidder",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "index",
                  type: "uint64",
                  internalType: "uint64",
                },
                {
                  name: "erc20Token",
                  type: "address",
                  internalType: "address",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getAuctionArray",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internalType: "struct Auction.Auction[]",
              components: [
                {
                  name: "tokenContract",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenId",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "createdTime",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "seller",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "startTime",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "endOfBiddingPeriod",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "endOfRevealPeriod",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "numUnrevealedBids",
                  type: "uint64",
                  internalType: "uint64",
                },
                {
                  name: "highestBid",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "secondHighestBid",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "highestBidder",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "index",
                  type: "uint64",
                  internalType: "uint64",
                },
                {
                  name: "erc20Token",
                  type: "address",
                  internalType: "address",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getBid",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "auctionIndex",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "bidder",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "bid",
              type: "tuple",
              internalType: "struct Auction.Bid",
              components: [
                {
                  name: "commitment",
                  type: "bytes20",
                  internalType: "bytes20",
                },
                {
                  name: "collateral",
                  type: "uint96",
                  internalType: "uint96",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "revealBid",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "bidValue",
              type: "uint96",
              internalType: "uint96",
            },
            {
              name: "nonce",
              type: "bytes20",
              internalType: "bytes20",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "withdrawCollateral",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "auctionIndex",
              type: "uint64",
              internalType: "uint64",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "AssetTransferred",
          inputs: [
            {
              name: "tokenContract",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "from",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
    ERC20Token: {
      address: "0x349Cfa62A7b48dbA1AB0Ae2688eCB88B75FaC45e",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_name",
              type: "string",
              internalType: "string",
            },
            {
              name: "_symbol",
              type: "string",
              internalType: "string",
            },
            {
              name: "_decimals",
              type: "uint8",
              internalType: "uint8",
            },
            {
              name: "_initialSupply",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "_owner",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "allowance",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "uint8",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "mint",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            {
              name: "from",
              type: "address",
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            {
              name: "owner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "spender",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ERC20InsufficientAllowance",
          inputs: [
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
            {
              name: "allowance",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InsufficientBalance",
          inputs: [
            {
              name: "sender",
              type: "address",
              internalType: "address",
            },
            {
              name: "balance",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidApprover",
          inputs: [
            {
              name: "approver",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidReceiver",
          inputs: [
            {
              name: "receiver",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidSender",
          inputs: [
            {
              name: "sender",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidSpender",
          inputs: [
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
      inheritedFunctions: {
        allowance: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        approve: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        balanceOf: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        decimals: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        name: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        symbol: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        totalSupply: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        transfer: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        transferFrom: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
