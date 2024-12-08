//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/Auction.sol";
import "./DeployHelpers.s.sol";

contract DeployAuction is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    Auction auction = new Auction(deployer);
    console.logString(
      string.concat(
        "YourContract deployed at: ", vm.toString(address(auction))
      )
    );
  }
}