import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY


export async function mintHT(toAddress) {

  console.log(API_URL)
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3(API_URL)

  const contract = require("../artifacts/contracts/MyNFT.sol/HospitalToken.json")
  const contractAddress = "0x9bBEFEC7Ccbe63d1F4B923adbC8a081C9b952eE9"
  const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: toAddress,
      nonce: nonce,
      gas: 21432,
      data: nftContract.methods.mint(toAddress).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
}