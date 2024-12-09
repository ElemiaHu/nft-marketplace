import { defineChain } from "viem";

// Sepolia Fork
export const sepoliaFork = defineChain({
  id: 114514,
  name: "Sepolia Fork",
  nativeCurrency: { name: "Base", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://virtual.sepolia.rpc.tenderly.co/7fa64baa-bec9-4086-bc1a-593e45473b56"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sepoliaforkscan",
      url: "https://dashboard.tenderly.co/explorer/vnet/7fa64baa-bec9-4086-bc1a-593e45473b56",
    },
  },
});
