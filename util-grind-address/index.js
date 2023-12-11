const { quais } = require('quais')

const QRC20Json = require('./contract/QRC20.json')

// Create provider for wallet
const provider = new quais.providers.JsonRpcProvider('https://rpc.cyprus1.colosseum.quaiscan.io')

// Define private key for wallet
const privateKey = '0x0000000000000000000000000000000000000000000000000000000000000000' // replace with your private key

// Create wallet for contractFactory
const wallet = new quais.Wallet(privateKey, provider)

const main = async () => {
	// Create contract factory
	const contract = new quais.ContractFactory(QRC20Json.abi, QRC20Json.bytecode, wallet)

	// Get raw deploy transaction
	const deployTx = contract.getDeployTransaction()

	// Grind the contract address using the raw deploy transaction
	const grindedTx = await contract.grindContractAddress(deployTx)
	console.log('\nThe grinded contract address is ' + JSON.stringify(grindedTx) + '.\n')
}

main()