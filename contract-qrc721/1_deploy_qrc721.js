/*
This script deploys a simple QRC721 token to a single chain within Quai Network
*/

const { quais } = require('quais')
const { pollFor } = require('quais-polling')
const QRC721Json = require('./contract/QRC721.json')

// Define constructor arguments for token deployment (name, symbol)
const constructorArgs = {
	name: 'Quai NFT',
	symbol: 'QNFT',
}

/* 
-- Define chain and address configurations for deployment
NOTE: this is a relatively insecure method of storing private keys and should not be used in production
If you plan to use this in production, please load them from a secure environment variable or encrypted file
*/
const deployConfig = {
	name: 'cyprus1', // name of the chain you want to deploy to (optional, just for logging purposes)
	rpcURL: 'https://rpc.cyprus1.colosseum.quaiscan.io', // rpc endpoint for the chain you want to deploy to
	privKey: '0x0000000000000000000000000000000000000000000000000000000000000000', // private key of the address you want to deploy from
}

// define provider and wallet for deployment
const provider = new quais.providers.JsonRpcProvider(deployConfig.rpcURL)
const wallet = new quais.Wallet(deployConfig.privKey, provider)

const deployQRC721 = async () => {
	// Indicate deployment has started
	console.log(`*** Deploying ${constructorArgs.name} on: ` + deployConfig.name + ' **')

	// Define contractFactory instance
	const QRC721 = new quais.ContractFactory(QRC721Json.abi, QRC721Json.bytecode, wallet)

	// Deploy contract with constructor arguments specified above
	const qrc721 = await QRC721.deploy(constructorArgs.name, constructorArgs.symbol, constructorArgs.totalSupply, { gasLimit: 5000000 })

	// Poll for transaction receipt and log contract address
	const qrc721DeployReceipt = await pollFor(provider, 'getTransactionReceipt', [qrc721.deployTransaction.hash], 1.5, 1)

	// Print out the contract address
	console.log(constructorArgs.name + ' deployed to: ' + qrc721DeployReceipt.contractAddress)
}

deployQRC721()
