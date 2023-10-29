const hre = require("hardhat");

async function main() {
  const HospitalToken = await hre.ethers.getContractFactory("HospitalToken");
  const hospitalToken = await HospitalToken.deploy();

  await hospitalToken.deployed();
  console.log("HospitalToken deployed to:", hospitalToken.address);

  const MedicalRecordToken = await hre.ethers.getContractFactory("MedicalRecordToken");
  const medicalRecordToken = await MedicalRecordToken.deploy(hospitalToken.address);

  await medicalRecordToken.deployed();
  console.log("MedicalRecordToken deployed to:", medicalRecordToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// async function main() {
//     const MyNFT = await ethers.getContractFactory("MedicalRecordToken")
  
//     // Start deployment, returning a promise that resolves to a contract object
//     const myNFT = await MyNFT.deploy()
//     await myNFT.deployed()
//     console.log("Contract deployed to address:", myNFT.address)
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error)
//       process.exit(1)
//     })
  