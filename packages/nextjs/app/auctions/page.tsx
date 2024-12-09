"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import AuctionCard from "~~/components/AuctionCard";
import { AddressInput, InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { deployedNFTAbi } from "~~/contracts/deployedNFT";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// import { readContract } from "wagmi/actions";
const Page = () => {
  const { data: auctions } = useScaffoldReadContract({
    contractName: "Auction",
    functionName: "getAuctionArray",
  });
  const handleNFTInfo = (tokenContract: string, tokenId: number) => {
    const result = useReadContract({
      abi: deployedNFTAbi,
      address: tokenContract,
      functionName: "getTokenIPFSString",
      args: [tokenId],
    });
    console.log("result: ", result);
    return;
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={"/"} passHref>
        <button className="btn btn-primary">back</button>
      </Link>
      <button
        className="btn btn-primary"
        onClick={async () => {
          console.log(auctions);
        }}
      >
        Get Auctions
      </button>
      {auctions && auctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctions.map((auction, index) => (
            <AuctionCard auction={auction} key={index} />
          ))}
        </div>
      ) : (
        // 没有数据时显示提示信息
        <div className="text-center text-gray-500">
          <div>No auctions available at the moment.</div>
        </div>
      )}
    </div>
  );
};
export default Page;
