// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { DeployNFTFactory } from "./DeployNFTFactory.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        DeployNFTFactory deployNFTFactory = new DeployNFTFactory();
        deployNFTFactory.run();
    }
}
