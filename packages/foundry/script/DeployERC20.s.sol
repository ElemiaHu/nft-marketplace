//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../contracts/ERC20Token.sol";
import "./DeployHelpers.s.sol";

contract DeployERC20 is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    ERC20Token erc20Token = new ERC20Token("NEU Token", "NEU", 18, 1_000_000);
    console.logString(
      string.concat(
        "ERC20Token contract deployed at: ", vm.toString(address(erc20Token))
      )
    );
  }
}