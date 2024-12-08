"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Page = () => {
  const [nftName, setNFTName] = useState<string>("");
  const [nftSymbol, setNFTSymbol] = useState<string>("");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("NFTFactory");

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="self-start">
        <Link href={"/"} passHref>
          <button className="btn btn-neutral btn-outline">Back</button>
        </Link>
      </div>

      <div className="w-full max-w-md bg-base-200 p-6 rounded-lg shadow-md space-y-4">
        <div className="text-2xl font-bold text-center">New NFT Collection</div>
        <InputBase name="nftName" placeholder="Name" value={nftName} onChange={setNFTName} />
        <InputBase name="nftSymbol" placeholder="Symbol" value={nftSymbol} onChange={setNFTSymbol} />

        <button
          className="btn btn-primary w-full"
          onClick={async () => {
            try {
              await writeYourContractAsync({
                functionName: "createCollection",
                args: [nftName, nftSymbol],
              });
            } catch (e) {
              console.error("Error setting greeting:", e);
            }
          }}
        >
          Create a Collection
        </button>
      </div>
    </div>
  );
};
export default Page;
