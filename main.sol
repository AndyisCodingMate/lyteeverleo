// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HospitalToken is IERC20 {
    uint256 public totalSupply;
    mapping(address => uint256) balances;
    address public admin;

    constructor() {
        totalSupply = 0;
        admin = msg.sender;
    }

     modifier onlyAdmin() {
        require(msg.sender == admin, "HospitalToken: Caller is not the admin");
        _;
    }

    function mint(address to) public onlyAdmin{
        totalSupply += 1;
        balances[to] += 1;
    }

    function burn(address from) public onlyAdmin {
        require(balances[from] > 0, "Insufficient balance");
        totalSupply -= 1;
        balances[from] -= 1;
    }
}

contract MedicalRecordToken is ERC721 {
    uint256 public tokenCounter;
    HospitalToken public hospitalToken;

    struct record {
        uint256 tokenid;
        string encryptedPatientData; //encrypted json file
    }

    mapping(uint256 => record) public records;

    constructor(address _hospitalTokenAddress) ERC721("MedicalRecordToken", "MRT") {
        tokenCounter = 0;
        hospitalToken = HospitalToken(_hospitalTokenAddress);
    }

    modifier canView(uint256 tokenId) {
        require(
            msg.sender == ownerOf(tokenId) || hospitalToken.balanceOf(msg.sender) > 0,
            "MedicalRecordToken: You are not allowed to view this record"
        );
        _;
    }

    function mint(address to, string memory p_data) public {
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        records[tokenId] = record(tokenId, p_data);
        tokenCounter++;
    }

    function getTextData(uint256 tokenId) public canView view returns (uint256, string memory) {
        require(_exists(tokenId), "MedicalRecordNFT: URI query for nonexistent token");
        record memory retrievedRecord = records[tokenId];
        return (tokenId, retrievedRecord.encryptedPatientData);
    }
}
