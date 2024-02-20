/*
This script deploys a simple ERC721 token to a single chain within Quai Network
*/

const { quais } = require('quais')
const { pollFor } = require('quais-polling')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

// Import ABI
const ERC721Json = require('./contract/ERC721.json')

// Define constructor arguments for NFT deployment (name, symbol, baseURI)
const constructorArgs = {
	name: 'Test ERC721 Token',
	symbol: 'TE721',
	baseURI: 'ipfs://METADATA_CID/',
}

// Define chain and address configurations for deployment
const deployConfig = {
	name: 'cyprus1', // name of the chain you want to deploy to (optional, just for logging purposes)
	rpcURL: process.env.CYPRUS1URL, // rpc endpoint for the chain you want to deploy to loaded from .env file
	privKey: process.env.CYPRUS1PK, // private key of the address you want to deploy from loaded from .env file
}

// Define provider and wallet for deployment
const provider = new quais.providers.JsonRpcProvider(deployConfig.rpcURL)
const wallet = new quais.Wallet(deployConfig.privKey, provider)

const deployERC721 = async () => {
	// Indicate deployment has started
	console.log(`*** Deploying ${constructorArgs.name} on ` + deployConfig.name + ' ***')

	// Define contractFactory instance
	const ERC721 = new quais.ContractFactory(ERC721Json.abi, ERC721Json.bytecode, wallet)

	// Deploy contract with constructor arguments specified above
	const erc721 = await ERC721.deploy(constructorArgs.name, constructorArgs.symbol, constructorArgs.baseURI, { gasLimit: 5000000 })

	// Poll for transaction receipt and log contract address
	const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [erc721.deployTransaction.hash], 1.5, 1)

	// Print out the contract address
	console.log(constructorArgs.name + ' deployed to: ' + deployReceipt.contractAddress)
}

deployERC721()
