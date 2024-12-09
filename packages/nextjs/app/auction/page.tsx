"use client";

import React, { useState } from "react";
import Link from "next/link";
import { parseEther } from "viem";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Page = () => {
  const [nft, setNFT] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [bidPeriod, setBidPeriod] = useState<string>("");
  const [revealPeriod, setRevealPeriod] = useState<string>("");
  const [reservePrice, setReservePrice] = useState<string>("");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("Auction");

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="self-start">
        {" "}
        <Link href={"/"} passHref>
          <button className="btn btn-neutral btn-outline">back</button>
        </Link>
      </div>

      <div className="w-full max-w-md bg-base-200 p-6 rounded-lg shadow-md space-y-4">
        <div className="text-2xl font-bold text-center">New Auction</div>
        <AddressInput name="nft" placeholder="NFT Collection Address" value={nft} onChange={setNFT} />
        <InputBase value={tokenId} onChange={setTokenId} placeholder="Token ID" />
        <AddressInput name="token" placeholder="ERC20 Token Address" value={token} onChange={setToken} />
        <div className="flex border-2 border-base-300 bg-base-200 rounded-full text-accent">
          <input
            type="datetime-local"
            className="input input-ghost focus-within:border-transparent focus:outline-none bg-transparent h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/70 text-base-content/70 focus:text-base-content/70"
            onChange={e => {
              const date = new Date(e.target.value);
              const timestamp = Math.floor(date.getTime() / 1000);
              setStartTime(timestamp.toString());
            }}
          />
        </div>
        <InputBase
          name="bidperiod"
          placeholder="Auction Bid Period Duration"
          value={bidPeriod}
          onChange={setBidPeriod}
        />
        <InputBase
          name="revealperiod"
          placeholder="Auction Reveal Period Duration"
          value={revealPeriod}
          onChange={setRevealPeriod}
        />
        <InputBase name="reserveprice" placeholder="Reserve Price" value={reservePrice} onChange={setReservePrice} />
        <button
          className="btn btn-primary w-full"
          onClick={async () => {
            try {
              await writeYourContractAsync({
                functionName: "createAuction",
                args: [
                  nft,
                  BigInt(tokenId),
                  token,
                  BigInt(startTime),
                  BigInt(bidPeriod),
                  BigInt(revealPeriod),
                  parseEther(reservePrice),
                ],
              });
            } catch (e) {
              console.error("Error creating auction:", e);
            }
          }}
        >
          Create auction
        </button>
      </div>
    </div>
  );
};
export default Page;
