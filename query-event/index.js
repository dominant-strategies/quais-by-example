const { quais } = require('quais')
const QRC20Json = require('./contract/QRC20.json')

// RPC endpoint to query for the chain the contract is deployed on
const rpcURL = 'https://rpc.cyprus1.colosseum.quaiscan.io'

// define provider
const provider = new quais.providers.JsonRpcProvider(rpcURL)

// set contract address we want to events from
const contractAddress = '0x0dcb6cc8516568104758705b8320924cdca5bd44'

// define contract instance
const QRC20 = new quais.Contract(contractAddress, QRC20Json.abi, provider)

// define filter - in this case we want to filter for Transfer events from a specific address
const filterFrom = QRC20.filters.Transfer('0x1077b8213a19e34c790da18a0a7ce723b074344d')

const main = async () => {
	// query for matching events in the last 100 blocks
	const logsFrom = await QRC20.queryFilter(filterFrom, -100, 'latest')
	console.log(`\nLogs from: ${JSON.stringify(logsFrom)}\n`)
}

main()
