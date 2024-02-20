/*
This script deploys a simple ERC20 token to a single chain within Quai Network
*/

const { quais } = require('quais')
const { pollFor } = require('quais-polling')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

// Import ABI
const ERC20Json = require('./contract/ERC20.json')

// Define constructor arguments for token deployment (name, symbol, totalSupply)
const constructorArgs = {
	name: 'Test ERC20 Token',
	symbol: 'TE20',
	totalSupply: 1000000000000,
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

const deployERC20 = async () => {
	// Indicate deployment has started
	console.log(`*** Deploying ${constructorArgs.name} on ` + deployConfig.name + ' ***')

	// Define contractFactory instance
	const ERC20 = new quais.ContractFactory(ERC20Json.abi, ERC20Json.bytecode, wallet)

	// Deploy contract with constructor arguments specified above
	const erc20 = await ERC20.deploy(constructorArgs.name, constructorArgs.symbol, constructorArgs.totalSupply, { gasLimit: 5000000 })

	// Poll for transaction receipt and log contract address
	const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [erc20.deployTransaction.hash], 1.5, 1)

	// Print out the contract address
	console.log(constructorArgs.name + ' deployed to: ' + deployReceipt.contractAddress)
}

deployERC20()
