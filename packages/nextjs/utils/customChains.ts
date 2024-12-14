import { defineChain } from "viem";

// Sepolia Fork
export const sepoliaFork = defineChain({
  id: 114516,
  name: "Sepolia Fork V3",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://virtual.sepolia.rpc.tenderly.co/9759a76d-5fa8-4d17-9130-391ab781059c"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sepoliaforkscan",
      url: "https://dashboard.tenderly.co/explorer/vnet/9759a76d-5fa8-4d17-9130-391ab781059c",
    },
  },
});
