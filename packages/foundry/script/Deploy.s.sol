// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";  // Foundry's Script library for deployments
import "../contracts/YourContract.sol";  // Import your contract to deploy

contract DeployScript is Script {
    // Define the deployment function
    function run() external {
        // Retrieve the private key (set via environment variable)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); // Replace with your environment variable
        
        // Start broadcasting the transaction
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the contract (pass constructor args if needed)
        YourContract yourContract = new YourContract(address(this)); // Example: deploying with `address(this)` as initial owner
        
        // Output the contract address after deployment
        console.log("YourContract deployed to:", address(yourContract));
        
        // Stop broadcasting the transaction
        vm.stopBroadcast();
    }
}
