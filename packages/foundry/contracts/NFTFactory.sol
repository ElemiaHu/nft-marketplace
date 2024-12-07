//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";
import {ERC721Token} from "./ERC721Token.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/IERC721Metadata.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";
/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract NFTFactory {
  // Mapping from deployed contract address to deployer
    mapping(address => address) public collections;
    address[] public allCollections;
    address public immutable owner;
    event CollectionCreated(
      address indexed collectionAddress,
      address indexed deployer,
      string name,
      string symbol
    );
    // Constructor: Called once on contract deployment
    // Check packages/foundry/deploy/Deploy.s.sol
    constructor(address _owner) {
      owner = _owner;
    }
    // Deploy a new NFT collection
    function createCollection(string memory name, string memory symbol) external {
      // Deploy a new ERC721Token contract
      ERC721Token collection = new ERC721Token(name, symbol, msg.sender);
      // Store the deployer and the deployed contract
      collections[address(collection)] = msg.sender;
      allCollections.push(address(collection));
      emit CollectionCreated(address(collection), msg.sender, name, symbol);
    }
    // Get the name and symbol of a deployed ERC721 contract
    function getCollectionInfo(address collectionAddress) public view returns (string memory, string memory) {
        IERC721Metadata collection = IERC721Metadata(collectionAddress);
        return (collection.name(), collection.symbol());
    }
    // Get all deployed collections
    function getAllCollections() public view returns (address[] memory) {
        return allCollections;
    }
}