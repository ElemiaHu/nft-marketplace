"use client";

import React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { deployedNFTAbi } from "~~/contracts/deployedNFT";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Page = () => {
  const params = useParams();
  const collection = params.address as string;
  const [toAddress, setToAddress] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState<string>("");
  const { data: hash, writeContractAsync, error: writeContractError } = useWriteContract();
  const { address: connectedAddress } = useAccount();
  const { data: collectionInfo } = useScaffoldReadContract({
    contractName: "NFTFactory",
    functionName: "getCollectionInfo",
    args: [collection],
  });
  const result = useReadContract({
    abi: deployedNFTAbi,
    address: collection,
    functionName: "getOwnedNFTs",
    args: [connectedAddress],
  });
  const nfts = result.data as { tokenId: bigint; ipfsString: string }[];
  return (
    <div className="flex flex-col justify-center items-center">
      <div>NFT collection: {params.address}</div>
      <div>NFT name: {collectionInfo?.[0]}</div>
      <div>NFT symbol: {collectionInfo?.[1]}</div>
      <AddressInput name="to" placeholder="enter an address" value={toAddress} onChange={setToAddress} />
      <InputBase name="ipfsUrl" placeholder="enter an ipfs url" value={ipfsUrl} onChange={setIpfsUrl} />
      <button
        className="btn btn-primary"
        onClick={async () => {
          writeContractAsync({
            abi: deployedNFTAbi,
            address: collection,
            functionName: "mint",
            args: [toAddress, ipfsUrl],
          });
        }}
      >
        Mint
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log("result: ", result.data);
        }}
      >
        Click
      </button>
      <div>
        {nfts?.map((nft, index) => {
          return (
            <div key={index} className="space-x-5">
              <span>nft token id: {nft.tokenId.toString()}</span>
              <span>nft ipfs url: {nft.ipfsString}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
