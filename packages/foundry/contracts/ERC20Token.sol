// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
  address public immutable owner;

  constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply, address _owner) ERC20(_name, _symbol) {
      owner = _owner;

    // Mint initial supply to the contract deployer
    _mint(msg.sender, _initialSupply * (10**uint256(_decimals)));
  }
  
  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }
}