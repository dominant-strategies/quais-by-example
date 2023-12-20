/*
This script deploys a QRC20 token contract to multiple chains within Quai Network and links them together
*/

const { quais } = require('quais')
const { pollFor } = require('quais-polling')

// Import ABI
const QRC20Json = require('./contract/QRC20.json')

// Initialize array to store contract addresses after deployment for linking
const contractAddresses = []

// Define chain indexes for linking, 0: cyprus1, 1, 1: cyprus2, etc.
const chainIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

// Define constructor arguments for token deployment (name, symbol, totalSupply)
const constructorArgs = {
	name: 'Quai Token',
	symbol: 'QUAI',
	totalSupply: 1000000000000, // note this will be the local total supply of the token on each chain you deploy to
}

// Define chain and address configurations for deployment
// NOTE: this is a relatively insecure method of storing private keys and should not be used in production
// If you plan to use this in production, please load them from a secure environment variable or encrypted file
const deployConfig = [
	{
		name: 'cyprus1',
		rpcURL: 'https://rpc.cyprus1.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'cyprus2',
		rpcURL: 'https://rpc.cyprus2.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'cyprus3',
		rpcURL: 'https://rpc.cyprus3.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'paxos1',
		rpcURL: 'https://rpc.paxos1.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'paxos2',
		rpcURL: 'https://rpc.paxos2.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'paxos3',
		rpcURL: 'https://rpc.paxos3.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'hydra1',
		rpcURL: 'https://rpc.hydra1.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'hydra2',
		rpcURL: 'https://rpc.hydra2.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
	{
		name: 'hydra3',
		rpcURL: 'https://rpc.hydra3.colosseum.quaiscan.io',
		privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
	},
]

const deployQRC20 = async (index) => {
	console.log(`*** Deploying ${constructorArgs.name} on: ` + deployConfig[index].name + ' **')

	// Configure provider and wallet for deploying on each chain
	const provider = new quais.providers.JsonRpcProvider(deployConfig[index].rpcURL)
	const wallet = new quais.Wallet(deployConfig[index].privKey, provider)

	// Define contract instance
	const QRC20 = new quais.ContractFactory(QRC20Json.abi, QRC20Json.bytecode, wallet)

	// Deploy contract with constructor arguments specified above
	const qrc20 = await QRC20.deploy(constructorArgs.name, constructorArgs.symbol, constructorArgs.totalSupply, { gasLimit: 5000000 })

	// Poll for transaction receipt and log contract address
	const qrc20DeployReceipt = await pollFor(provider, 'getTransactionReceipt', [qrc20.deployTransaction.hash], 1.5, 1)

	// Add contract address to array for linking in the next section
	contractAddresses.push(qrc20DeployReceipt.contractAddress)
	console.log(`--- ${constructorArgs.name} token deployed on ${deployConfig[index].name} at ${qrc20DeployReceipt.contractAddress} ---\n`)
}

const linkQRC20 = async (index) => {
	console.log(`*** Linking ${constructorArgs.name} token on ${deployConfig[index].name} **`)

	// Configure provider and wallet for linking on each chain
	const provider = new quais.providers.JsonRpcProvider(deployConfig[index].rpcURL)
	const wallet = new quais.Wallet(deployConfig[index].privKey, provider)

	// Define contract instance
	const qrc20 = new quais.Contract(contractAddresses[index], QRC20Json.abi, wallet)

	// Build contract linking transaction
	const transactionData = await qrc20.populateTransaction.AddApprovedAddresses(chainIndexes, contractAddresses)

	// Send linking transaction
	const tx = await wallet.sendTransaction({
		to: transactionData.to,
		from: transactionData.from,
		data: transactionData.data,
		gasLimit: 5000000,
	})

	// Poll for transaction receipt and log transaction hash
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [tx.hash], 1.5, 1)
	console.log(`--- ${constructorArgs.name} token on ${deployConfig[index].name} linked with transaction hash ${txReceipt.transactionHash} ---\n`)
}

const main = async () => {
	// Deploy QRC20 to each chain specified in the config array
	for (let i = 0; i < deployConfig.length; i++) {
		await deployQRC20(i)
	}

	// Link deployed QRC20 contracts on specified chains
	for (let i = 0; i < contractAddresses.length; i++) {
		await linkQRC20(i)
	}

	// Log deployed contract addresses
	console.log(`Deployment complete. ${constructorArgs.name} token deployed to: ` + contractAddresses + '\n')
}

main()
