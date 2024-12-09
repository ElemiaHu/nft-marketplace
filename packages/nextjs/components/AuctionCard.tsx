import React, { useState } from "react";
import Image from "next/image";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { deployedNFTAbi } from "~~/contracts/deployedNFT";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("Auction");
  const [bidPrice, setBidPrice] = useState("");
  const isAuctionActive = Number(auction.startTime) <= Math.floor(Date.now() / 1000);

  const handlePlaceBid = async () => {
    console.log(Date.now());
    console.log(auction.startTime);
    try {
      await writeYourContractAsync({
        functionName: "commitBid",
        args: [auction.tokenContract, auction.tokenId, auction.tokenContract as `0x${string}`, parseEther(bidPrice)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
    console.log(`Placing bid of ${bidPrice} ETH for tokenId: ${auction.tokenId}`);
  };
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
          <strong>Highest Bid:</strong> {formatEther(auction.highestBid)} ETH
        </p>
        <p>
          <strong>Highest Bidder:</strong> <Address address={auction.highestBidder} />
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
        disabled={!isAuctionActive}
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
    </div>
  );
};
export default AuctionCard;
