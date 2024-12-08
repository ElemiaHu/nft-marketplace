// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { DeployNFTFactory } from "./DeployNFTFactory.s.sol";
import { DeployAuction } from "./DeployAuction.s.sol";
import { DeployERC20 } from "./DeployERC20.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        DeployNFTFactory deployNFTFactory = new DeployNFTFactory();
        deployNFTFactory.run();
        DeployAuction deployAuction = new DeployAuction();
        deployAuction.run();
        DeployERC20 deployERC20 = new DeployERC20();
        deployERC20.run();
    }
}
