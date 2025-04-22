// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract NFTCollection is ERC721, ERC721URIStorage, ERC2981, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    uint256 public constant MINT_PRICE = 0.0001 ether;
    uint256 public constant MAX_SUPPLY = 10;
    uint256 public constant ROYALTY_PERCENTAGE = 250; // 2.5%
    
    mapping(address => bool) public hasMinted;
    mapping(uint256 => string) private _tokenURIs;
    
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event RoyaltyUpdated(uint256 newPercentage);
    
    constructor() ERC721("LastDance NFT", "LDNFT") Ownable(msg.sender) {
        _setDefaultRoyalty(msg.sender, ROYALTY_PERCENTAGE);
    }
    
    function mint(string memory tokenURI) public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");
        require(!hasMinted[msg.sender], "Already minted");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        hasMinted[msg.sender] = true;
        
        emit NFTMinted(msg.sender, newTokenId, tokenURI);
    }
    
    function batchMint(string[] memory tokenURIs) public payable {
        require(msg.value >= MINT_PRICE * tokenURIs.length, "Insufficient payment");
        require(_tokenIds.current() + tokenURIs.length <= MAX_SUPPLY, "Exceeds max supply");
        require(!hasMinted[msg.sender], "Already minted");
        
        for(uint256 i = 0; i < tokenURIs.length; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            
            _safeMint(msg.sender, newTokenId);
            _setTokenURI(newTokenId, tokenURIs[i]);
            
            emit NFTMinted(msg.sender, newTokenId, tokenURIs[i]);
        }
        
        hasMinted[msg.sender] = true;
    }
    
    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }
    
    function setDefaultRoyalty(uint96 percentage) public onlyOwner {
        require(percentage <= 1000, "Royalty percentage too high"); // Max 10%
        _setDefaultRoyalty(msg.sender, percentage);
        emit RoyaltyUpdated(percentage);
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
} 