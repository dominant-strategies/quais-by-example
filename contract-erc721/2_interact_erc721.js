/*
This script transfers a ERC721 token from one account to another on a single chain
*/

const quais = require('quais')
const { pollFor } = require('quais-polling')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

// Import ABI
const ERC721Json = require('./contract/ERC721.json')

// Define chain and address configurations for deployment
const networkConfig = {
	name: 'cyprus1', // name of the chain your contract is deployed on (optional, just for logging purposes)
	rpcURL: process.env.CYPRUS1URL, // rpc endpoint for the chain you want to deploy to loaded from .env file
	privKey: process.env.CYPRUS1PK, // private key of the address you want to deploy from loaded from .env file
	contractAddress: '0x0000000000000000000000000000000000000000', // deployed contract address
}

// define provider, wallet, and contract
const provider = new quais.providers.JsonRpcProvider(networkConfig.rpcURL)
const wallet = new quais.Wallet(networkConfig.privKey, provider)
const erc721 = new quais.Contract(networkConfig.contractAddress, ERC721Json.abi, wallet) // deployed contract instance

// Define transaction data
const fromAddress = wallet.address
const toAddress = '0x0000000000000000000000000000000000000000' // replace with the address you want to transfer tokens to
const tokenId = 1 // replace with the tokenId you want to transfer

const transferERC721 = async () => {
	// Indicate transfer has started
	console.log(`Transferring tokenId ${tokenId} to: ` + toAddress)

	// Transfer token
	const tx = await erc721.safeTransferFrom(fromAddress, toAddress, tokenId)

	// Poll for transaction receipt and log transaction hash
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [tx.hash], 1.5, 1)
	console.log('Transaction hash: ' + txReceipt.transactionHash)
}

transferERC721()
