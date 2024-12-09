import { defineChain } from "viem";

// Sepolia Fork
export const sepoliaFork = defineChain({
  id: 114515,
  name: "Sepolia Fork V2",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://virtual.sepolia.rpc.tenderly.co/6ad5d5e6-43c2-4d5b-a47b-79b2ef30a6de"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sepoliaforkscan",
      url: "https://dashboard.tenderly.co/explorer/vnet/6ad5d5e6-43c2-4d5b-a47b-79b2ef30a6de",
    },
  },
});
