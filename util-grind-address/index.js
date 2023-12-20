const { quais } = require('quais')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const QRC20Json = require('./contract/QRC20.json')

// Create provider for wallet
const provider = new quais.providers.JsonRpcProvider(process.env.RPCURL) // loaded from .env file

// Define private key for wallet
const privateKey = process.env.PRIVKEY // loaded from .env file

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
