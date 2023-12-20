/*
This script transfers a QRC721 token from one account to another on a single chain
*/

const quais = require('quais')
const { pollFor } = require('quais-polling')

// Define chain and address configurations for deployment
// NOTE: this is a relatively insecure method of storing private keys and should not be used in production
// If you plan to use this in production, please load them from a secure environment variable or encrypted file
const networkConfig = {
	name: 'cyprus1', // name of the chain your contract is deployed on (optional, just for logging purposes)
	rpcURL: 'https://rpc.cyprus1.colosseum.quaiscan.io', // rpc endpoint for the chain your contract is deployed on
	privKey: '0x0000000000000000000000000000000000000000000000000000000000000000', // private key of the address you want to send tokens from
	contractAddress: '0x0000000000000000000000000000000000000000', // deployed contract address
}

// define provider, wallet, and contract
const provider = new quais.providers.JsonRpcProvider(networkConfig.rpcURL)
const wallet = new quais.Wallet(networkConfig.privKey, provider)
const qrc721 = new quais.Contract(networkConfig.contractAddress, QRC721Json.abi, wallet) // deployed contract instance

// Define transaction data
const fromAddress = wallet.address
const toAddress = '0x0000000000000000000000000000000000000000' // replace with the address you want to transfer tokens to
const tokenId = 1 // replace with the tokenId you want to transfer

const transferQRC721 = async () => {
	// Indicate transfer has started
	console.log(`Transferring tokenId ${tokenId} to: ` + toAddress)

	// Build transfer transaction
	const transactionData = await qrc721.populateTransaction.safeTransferFrom(fromAddress, toAddress, tokenId)

	// Send linking transaction
	const tx = await wallet.sendTransaction({
		to: transactionData.to,
		from: transactionData.from,
		data: transactionData.data,
		gasLimit: 1000000,
	})

	// Poll for transaction receipt and log transaction hash
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [tx.hash], 1.5, 1)
	console.log('Transaction hash: ' + txReceipt.transactionHash)
}

transferQRC721()
