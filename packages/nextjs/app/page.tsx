"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("NFTFactory");
  const { data: allCollections } = useScaffoldReadContract({
    contractName: "NFTFactory",
    functionName: "getAllCollections",
  });
  const [nftName, setNFTName] = useState<string>("");
  const [nftSymbol, setNFTSymbol] = useState<string>("");
  const [collections, setCollections] = useState<string[]>([]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col justify-center items-center space-y-2">
              <InputBase name="nftName" placeholder="name" value={nftName} onChange={setNFTName} />
              <InputBase name="nftSymbol" placeholder="symbol" value={nftSymbol} onChange={setNFTSymbol} />
              <button
                className="btn btn-primary"
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
                Create a collection
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (allCollections) {
                    console.log("allCollections: ", allCollections);
                    setCollections(allCollections as string[]);
                  }
                }}
              >
                Check all created collections
              </button>
              {allCollections?.map((collection, index) => {
                console.log(collection); // You can still log the collection here
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
        </div>
      </div>
    </>
  );
};

export default Home;
