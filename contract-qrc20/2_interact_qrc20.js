/*
This script transfers QRC20 tokens from one account to another on a single chain
*/

const quais = require('quais')
const { pollFor } = require('quais-polling')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

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
const qrc20 = new quais.Contract(networkConfig.contractAddress, QRC20Json.abi, wallet) // deployed contract instance

// Define transaction data
const toAddress = '0x0000000000000000000000000000000000000000' // replace with the address you want to transfer tokens to
const amount = 10 // replace with the amount of tokens you want to transfer

const transferQRC20 = async () => {
	// Indicate transfer has started
	console.log(`Transferring ${amount} tokens to: ` + toAddress)

	// Get wallet balance before transfer
	const balanceBefore = await qrc20.balanceOf(wallet.address)
	console.log(`Balance before transfer: ${balanceBefore}`)

	// Transfer tokens
	const transaction = await qrc20.Transfer(toAddress, amount)

	// Poll for transaction receipt and log transaction hash
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [transaction.hash], 1.5, 1)
	console.log('Transaction hash: ' + txReceipt.transactionHash)

	// Get wallet balance after transfer
	const balanceAfter = await qrc20.balanceOf(wallet.address)
	console.log(`Balance after transfer: ${balanceAfter}`)
}

transferQRC20()
