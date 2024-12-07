"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import abi from "~~/contracts/YourERC721Contract.json";

const CreateNFT = () => {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address

  const mintNFT = async () => {
    if (!address) {
      setStatus("Please connect your wallet.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.mint(recipient);
      setStatus("Minting in progress...");
      await tx.wait();
      setStatus(`NFT successfully minted to ${recipient}`);
    } catch (error: any) {
      console.error(error);
      setStatus("Error minting NFT: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold mb-5">Create an NFT</h1>
      <div className="flex flex-col items-center space-y-3">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={mintNFT} className="btn btn-primary">
          Mint NFT
        </button>
      </div>
      {status && <p className="mt-5">{status}</p>}
    </div>
  );
};

export default CreateNFT;
