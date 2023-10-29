
pragma solidity >=0.8.19;

import {console} from "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TextDataNFT is ERC721 {
    uint256 public tokenCounter;

    struct record {
        uint256 tokenid;
        string encryptedPatientData; //encrypted json file
        string privateKey;
        string publicKey;
    }

    mapping(uint256 => record) public records;

    constructor() ERC721("MedicalRecordToken", "MRT") {
        tokenCounter = 0;
    }

    function createMRNFT(address to, string p_data, string pri_key, string pub_key) public {
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        records[tokenId] = record(tokenId, p_data, pri_key, pub_key);
        tokenCounter++;
    }

    modifier canView {
        require(msg.sender == msg.sender, "MedicalRecordToken: You are not allowed to view this record");
        _;
    }

    function getTextData(uint256 tokenId) public canView view returns (uint256, string memory, string memory, string memory) {
    require(_exists(tokenId), "MedicalRecordNFT: URI query for nonexistent token");
    Record storage retrievedRecord = records[tokenId];
    return (
        retrievedRecord.encryptedPatientData,
        retrievedRecord.privateKey,
        retrievedRecord.publicKey
    );
}

}
