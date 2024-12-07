const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  // Load ABI and bytecode
  const abiPath = path.join(__dirname, "../out/YourERC721Contract.sol/YourERC721Contract.json");
  const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const { abi, bytecode } = contractJson;

  // Connect to the Ethereum network
  const provider = new ethers.providers.JsonRpcProvider("YOUR_TESTNET_RPC_URL");
  const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

  // Create contract factory
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  // Deploy the contract
  console.log("Deploying contract...");
  const options = { gasLimit: 3000000 };
  const contract = await factory.deploy(options);
  await contract.deployed();

  console.log("Contract deployed at:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
