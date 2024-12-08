"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  // const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("NFTFactory");
  const { data: allCollections } = useScaffoldReadContract({
    contractName: "NFTFactory",
    functionName: "getAllCollections",
  });
  // const [nftName, setNFTName] = useState<string>("");
  // const [nftSymbol, setNFTSymbol] = useState<string>("");
  const [collections, setCollections] = useState<string[]>([]);

  return (
    <>
      <div className="flex flex-row h-screen p-10 space-x-10">
        {/* NFT Collections */}
        <div className="w-1/2 bg-base-300 p-6 flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">NFT Collections</h2>

          {/* Create and Check Buttons */}
          <div className="w-full space-y-4 flex flex-col items-center">
            <Link href={"/create"} passHref className="w-1/2">
              <button className="btn btn-primary w-full">Create Collection</button>
            </Link>{" "}
            <button
              className="btn btn-secondary w-1/2"
              onClick={() => {
                if (allCollections) {
                  console.log("allCollections: ", allCollections);
                  setCollections(allCollections as string[]);
                }
              }}
            >
              All Collections
            </button>
          </div>

          {/* Collections List */}
          <div className="space-y-2 overflow-auto">
            <div className="text-xl font-bold">All Collections</div>
            {allCollections?.map((collection, index) => {
              return (
                <div key={index}>
                  <Link href={`/nft/${collection}`} passHref className="link">
                    {collection}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* NFT Auction */}
        <div className="w-1/2 bg-base-200 p-6 flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">NFT Auction</h2>

          {/* Start and View Buttons */}
          <div className="w-full space-y-4 flex flex-col items-center">
            <Link href={"/auction"} passHref className="w-1/2">
              <button className="btn btn-primary w-full">Start Auction</button>
            </Link>
            <button className="btn btn-secondary w-1/2">All Auctions</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
