"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PinataSDK } from "pinata-web3";
import { useReadContract, useWriteContract } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { deployedNFTAbi } from "~~/contracts/deployedNFT";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Define the uploadImage function using the Pinata SDK
async function uploadImage(file: File) {
  const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT;
  const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

  if (!pinataJwt || !pinataGateway) {
    throw new Error("Pinata JWT or Gateway is not defined in environment variables.");
  }

  const pinata = new PinataSDK({ pinataJwt, pinataGateway });
  try {
    const uploadResponse = await pinata.upload.file(file);
    return uploadResponse;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
}

const Page = () => {
  const params = useParams();
  const collection = params.address as string;
  const [toAddress, setToAddress] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState<string>("");

  const { writeContractAsync } = useWriteContract();
  const { data: collectionInfo } = useScaffoldReadContract({
    contractName: "NFTFactory",
    functionName: "getCollectionInfo",
    args: [collection],
  });

  const result = useReadContract({
    abi: deployedNFTAbi,
    address: collection,
    functionName: "getOwnedNFTs",
    args: [],
  });

  const nfts = result.data as { tokenId: bigint; ipfsString: string }[];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const response = await uploadImage(file);
      console.log("response:", response);
      const { IpfsHash } = response;
      setIpfsUrl(IpfsHash);
    }
  };

  return (
    <div className="w-full">
      <div className="px-6 pt-4">
        <Link href={"/"} passHref>
          <button className="btn btn-neutral btn-outline">Back</button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-center p-10 lg:space-x-10 space-y-6 lg:space-y-0">
        <div className="w-full lg:w-1/3 bg-base-200 p-6 rounded-lg">
          {/* NFT Collection */}
          <div className="space-y-2">
            <div className="text-xl font-bold">NFT Collection</div>
            <div className="font-bold">Address</div>
            <div>{collection}</div>
            <div className="font-bold">NFT Name</div>
            <div>{collectionInfo?.[0]}</div>
            <div className="font-bold">NFT Symbol</div>
            <div>{collectionInfo?.[1]}</div>
          </div>

          {/* Mint */}
          <div className="bg-base-200 p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-lg font-bold">Mint NFT</h3>
            <AddressInput name="to" placeholder="Enter an address" value={toAddress} onChange={setToAddress} />
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={async () => {
                if (toAddress && ipfsUrl) {
                  await writeContractAsync({
                    abi: deployedNFTAbi,
                    address: collection,
                    functionName: "mint",
                    args: [toAddress, ipfsUrl],
                  });
                }
              }}
            >
              Mint
            </button>
            {ipfsUrl && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
                <p>Success! Your submitted NFT IPFS URL is:</p>
                <span>{ipfsUrl}</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-6">You Owned</h3>

          {/* NFTs */}
          <div className="w-full p-6 space-y-6">
            {nfts?.map((nft, index) => {
              const imageUrl = `https://blue-traditional-tick-499.mypinata.cloud/ipfs/${nft.ipfsString}`;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between space-x-4 p-4 bg-base-300 rounded-lg shadow-md"
                >
                  <div className="flex flex-row items-center space-x-4">
                    <Image src={imageUrl} alt={`NFT ${nft.tokenId}`} width={100} height={100} className="rounded-md" />
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-start">
                        <div className="font-bold">Token ID:</div>
                        <div>{nft.tokenId.toString()}</div>
                      </div>
                      <div className="flex flex-row justify-start items-center space-x-2">
                        <div className="font-bold">IPFS URL:</div>
                        <div
                          className="relative group max-w-sm cursor-pointer text-blue-700"
                          title={nft.ipfsString}
                        >
                          {nft.ipfsString.slice(0, 6)}...{nft.ipfsString.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={{
                      pathname: "/auction",
                      query: {
                        collection: collection,
                        tokenId: nft.tokenId.toString(),
                      },
                    }}
                    passHref
                  >
                    <button className="btn btn-primary mt-4">Start Auction</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
