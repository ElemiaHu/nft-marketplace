//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/NFTFactory.sol";
import "./DeployHelpers.s.sol";

contract DeployNFTFactory is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    NFTFactory nftFactory = new NFTFactory(deployer);
    console.logString(
        string.concat(
            "NFTFactory contract deployed at: ", vm.toString(address(nftFactory))
        )
    );
  }
}