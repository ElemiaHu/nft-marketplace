// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";  // Foundry's Script library for deployments
import "../contracts/YourContract.sol";  // Import your contract to deploy
import { DeployYourContract } from "./DeployYourContract.s.sol";

contract DeployScript is Script {
    function run() external {
        DeployYourContract deployYourContract = new DeployYourContract();
        deployYourContract.run();
    }
}
