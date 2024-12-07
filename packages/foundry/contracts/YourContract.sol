// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract YourContract is ERC721, Ownable {
    uint256 private _nextTokenId;

    // Constructor: Pass initialOwner to the Ownable constructor and ERC721 constructor
    constructor(address initialOwner) ERC721("YourNFTCollection", "YNFT") Ownable(initialOwner) {
        transferOwnership(initialOwner); // Transfers ownership to the initialOwner
    }

    // Mint function that allows the owner to mint new NFTs
    function mint(address to) external onlyOwner {
        _safeMint(to, _nextTokenId);
        _nextTokenId++;
    }

    // Override the tokenURI function to return a custom URI for each token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        address owner = ownerOf(tokenId);
        require(owner != address(0), "Token does not exist");

        return string(abi.encodePacked("ipfs://YourIPFSHash/", Strings.toString(tokenId), ".json"));
    }

    // Example greeting function for testing purposes
    function greeting() public pure returns (string memory) {
        return "Building Unstoppable Apps!!!";
    }
}