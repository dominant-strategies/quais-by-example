const { quais } = require('quais')

// RPC endpoint to query for the chain the block was mined on
const rpcURL = 'https://rpc.cyprus1.colosseum.quaiscan.io'

// hex string block number to query
const blockNumber = '0x1234'

// Create provider to query against
const provider = new quais.providers.JsonRpcProvider(rpcURL)

const main = async () => {
	// get simplified block data (pass the second argument as true)
	const simplifiedBlock = await provider.getBlock(blockNumber, true)

	// get non-simplified block data (pass the second argument as false or omit it)
	const block = await provider.getBlock(blockNumber)

	console.log('\nThe simplified data for block number ' + blockNumber + ' is: \n\n' + JSON.stringify(simplifiedBlock))
	console.log('\nThe non-simplified data for block number ' + blockNumber + ' is: \n\n' + JSON.stringify(block) + '\n')
}

main()
