// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HipostekNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MINTING_FEE = 800 ether;

    address payable public owner;

    constructor() ERC721("HipostelNFT", "HIPPY") {
        owner = payable(msg.sender);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gray-quintessential-jellyfish-921.mypinata.cloud/ipfs/QmWFratCdRSLCMAamZWC7bvzTsHnpvhth7D4pn5Nsis9H7/";
    }


    function mintNFT() external payable {
        require(msg.value >= MINTING_FEE, "Insufficient payment");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
    }

    function privateMint() external {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only the contract owner can call this function");

        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");

        owner.transfer(contractBalance);
    }
}