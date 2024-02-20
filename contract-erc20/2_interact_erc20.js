/*
This script transfers ERC20 tokens from one account to another on a single chain
*/

const { pollFor } = require('quais-polling')
const quais = require('quais')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

// Import ABI
const ERC20Json = require('./contract/ERC20.json')

// Define chain and address configurations for deployment
const networkConfig = {
	name: 'cyprus1', // name of the chain your contract is deployed on (optional, just for logging purposes)
	rpcURL: process.env.CYPRUS1URL, // rpc endpoint for the chain you want to deploy to loaded from .env file
	privKey: process.env.CYPRUS1PK, // private key of the address you want to deploy from loaded from .env file
	contractAddress: '0x0000000000000000000000000000000000000000', // deployed contract address
}

// Define provider, wallet, and contract
const provider = new quais.providers.JsonRpcProvider(networkConfig.rpcURL)
const wallet = new quais.Wallet(networkConfig.privKey, provider)
const erc20 = new quais.Contract(networkConfig.contractAddress, ERC20Json.abi, wallet) // deployed contract instance

// Define transaction data
const toAddress = '0x0000000000000000000000000000000000000000' // replace with the address you want to transfer tokens to
const amount = quais.utils.parseEther('1') // replace with the amount of tokens you want to transfer

// Get address shards
const fromShard = quais.utils.getShardFromAddress(wallet.address)
const toShard = quais.utils.getShardFromAddress(toAddress)

const transferERC20 = async () => {
	if (fromShard !== toShard) {
		console.log('Cross-shard transfer not supported')
		return
	}

	// Indicate transfer has started
	console.log(`Transferring ${amount} tokens to: ` + toAddress)

	// Get wallet balance before transfer
	const balanceBefore = await erc20.balanceOf(wallet.address)
	console.log(`Balance before transfer: ${balanceBefore}`)

	// Transfer tokens
	const tx = await erc20.transfer(toAddress, amount)

	// Poll for transaction receipt and log transaction hash
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [tx.hash], 1.5, 1)
	console.log('Transaction hash: ' + txReceipt.transactionHash)

	// Get wallet balance after transfer
	const balanceAfter = await erc20.balanceOf(wallet.address)
	console.log(`Balance after transfer: ${balanceAfter}`)
}

transferERC20()
