import React, { useState } from "react";
import Image from "next/image";
import { AbiCoder, getAddress, keccak256, toUtf8Bytes, zeroPadBytes } from "ethers";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { deployedNFTAbi } from "~~/contracts/deployedNFT";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Auction } from "~~/types/auction/auction";

interface AuctionProps {
  auction: Auction;
}
const AuctionCard: React.FC<AuctionProps> = ({ auction }) => {
  const { data, isLoading, error } = useReadContract({
    abi: deployedNFTAbi,
    address: auction.tokenContract,
    functionName: "getTokenIPFSString",
    args: [Number(auction.tokenId)],
  });

  const { writeContractAsync: writeAuction } = useScaffoldWriteContract("Auction");

  const { data: auctionInfo } = useScaffoldReadContract({
    contractName: "Auction",
    functionName: "getAuction",
    args: [auction.tokenContract, auction.tokenId],
  });

  const [bidPrice, setBidPrice] = useState("");
  const isAuctionActive =
    Number(auction.startTime) <= Math.floor(Date.now() / 1000) &&
    Number(auction.endOfBiddingPeriod) >= Math.floor(Date.now() / 1000);

  const isRevealActive =
    Number(auction.endOfBiddingPeriod) < Math.floor(Date.now() / 1000) &&
    Number(auction.endOfRevealPeriod) >= Math.floor(Date.now() / 1000);

  // 函数：生成 commitment
  function generateCommitment(
    nonce: string,
    bidValue: number,
    tokenContract: string,
    tokenId: number,
    auctionIndex: number,
  ): string {
    const abiCoder = new AbiCoder();

    // 编码数据，与 Solidity 的 `abi.encode` 保持一致
    const encodedData = abiCoder.encode(
      ["bytes32", "uint96", "address", "uint256", "uint256"],
      [zeroPadBytes(toUtf8Bytes(nonce), 32), bidValue, getAddress(tokenContract), tokenId, auctionIndex],
    );

    const hash = keccak256(encodedData);

    const commitment = hash.slice(0, 42);

    return commitment;
  }

  const handlePlaceBid = async () => {
    const commitment = generateCommitment(
      "fixed-nonce",
      Number(bidPrice),
      auction.tokenContract,
      Number(auction.tokenId),
      Number(auction.index),
    );

    try {
      await writeAuction({
        functionName: "commitBid",
        args: [auction.tokenContract, auction.tokenId, commitment as `0x${string}`, parseEther(bidPrice)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
    console.log(`Placing bid of ${bidPrice} ETH for tokenId: ${auction.tokenId}`);
  };

  // const handleRevealBid = async () => {
  //   const commitment = generateCommitment(
  //     "fixed-nonce",
  //     Number(bidPrice),
  //     auction.tokenContract,
  //     Number(auction.tokenId),
  //     Number(auction.index),
  //   );

  //   console.log(commitment);
  //   try {
  //     await writeAuction({
  //       functionName: "revealBid",
  //       args: [auction.tokenContract, auction.tokenId, parseEther(bidPrice), commitment as `0x${string}`],
  //     });
  //   } catch (e) {
  //     console.error("Error setting greeting:", e);
  //   }
  // };

  // const handleClick = () => {
  //   if (isLoading) {
  //     console.log("Loading metadata...");
  //     return;
  //   }
  //   if (error) {
  //     console.error("Failed to fetch metadata:", error);
  //     return;
  //   }
  //   console.log("Token Metadata:", data);
  // };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
      <div className="bg-gray-200 h-24 rounded-md mb-4 flex items-center justify-center">
        <Image
          src={`https://blue-traditional-tick-499.mypinata.cloud/ipfs/${data}`}
          alt="Uploaded Image"
          width={50}
          height={50}
        />
      </div>
      {/* auction info */}
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Created:</strong> {new Date(Number(auction.createdTime) * 1000).toLocaleString()}
        </p>
        <p>
          <strong>Start time:</strong> {new Date(Number(auction.startTime) * 1000).toLocaleString()}
        </p>
        <p>
          <strong>End of Bidding:</strong> {new Date(Number(auction.endOfBiddingPeriod) * 1000).toLocaleString()}
        </p>
        <p>
          <strong>Highest Bid:</strong> {auctionInfo ? formatEther(auctionInfo.highestBid) : ""} NEU token
        </p>
        <p>
          <strong>Highest Bidder:</strong> <Address address={auctionInfo ? auctionInfo.highestBidder : ""} />
        </p>
        <p>
          <strong>Seller:</strong> <Address address={auction.seller} />
        </p>
        <p>
          <strong>Token Contract:</strong> <Address address={auction.tokenContract} />
        </p>
        <p>
          <strong>Token ID:</strong> {Number(auction.tokenId)}
        </p>
      </div>
      <input
        type="number"
        value={bidPrice}
        onChange={e => setBidPrice(e.target.value)}
        placeholder="Enter your bid in ETH"
        className="mt-4 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
        disabled={!isAuctionActive && !isRevealActive}
      />
      {/* place bid */}
      <button
        className={`mt-4 w-full py-2 rounded-md transition ${
          isAuctionActive ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
        onClick={handlePlaceBid}
        disabled={!isAuctionActive}
      >
        Place a Bid
      </button>

      {/* <button
        className={`mt-4 w-full py-2 rounded-md transition ${
          isRevealActive ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
        onClick={handleRevealBid}
        disabled={!isRevealActive}
      >
        Reveal Bid
      </button> */}
    </div>
  );
};
export default AuctionCard;
