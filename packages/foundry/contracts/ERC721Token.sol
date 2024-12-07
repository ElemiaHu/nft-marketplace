// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract ERC721Token is ERC721Enumerable, Ownable {
    // Mapping to store IPFS strings for each token
    mapping(uint256 => string) private _tokenIPFSStrings;
    
    // Counter for generating unique token IDs
    uint256 private _nextTokenId;
    constructor(
        string memory name, 
        string memory symbol, 
        address initialOwner
    ) 
        ERC721(name, symbol) 
        Ownable(initialOwner) 
    {}
    /**
     * @dev Mint a new NFT with an associated IPFS string
     * @param recipient Address that will receive the NFT
     * @param ipfsString IPFS metadata string for the NFT
     * @return tokenId of the newly minted NFT
     */
    function mint(address recipient, string memory ipfsString) public onlyOwner returns (uint256) {
        require(recipient != address(0), "Recipient cannot be the zero address");
        require(bytes(ipfsString).length > 0, "IPFS string cannot be empty");
        // Mint the NFT
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(recipient, tokenId);
        
        // Store the IPFS string for this token
        _tokenIPFSStrings[tokenId] = ipfsString;
        
        return tokenId;
    }
    /**
     * @dev Get the IPFS string for a specific token
     * @param tokenId ID of the token
     * @return IPFS string associated with the token
     */
    function getTokenIPFSString(uint256 tokenId) public view returns (string memory) {
        require(tokenId < _nextTokenId, "Token does not exist");
        return _tokenIPFSStrings[tokenId];
    }
    /**
     * @dev Get all NFTs (token IDs and IPFS strings) owned by an address
     * @param owner Address to retrieve NFTs for
     * @return tokens Array of token structs containing token ID and IPFS string
     */
    function getOwnedNFTs(address owner) public view returns (TokenInfo[] memory) {
        uint256 balance = balanceOf(owner);
        TokenInfo[] memory tokens = new TokenInfo[](balance);
        
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            tokens[i] = TokenInfo({
                tokenId: tokenId,
                ipfsString: _tokenIPFSStrings[tokenId]
            });
        }
        
        return tokens;
    }
    // Struct to represent token information
    struct TokenInfo {
        uint256 tokenId;
        string ipfsString;
    }
}