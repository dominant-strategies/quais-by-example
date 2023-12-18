const { quais } = require('quais')

// define provider
const provider = new quais.providers.JsonRpcProvider('https://rpc.cyprus1.colosseum.quaiscan.io')

// define filter - in this case we want to filter for any Transfer events in the last 10 blocks
const filter = {
	fromBlock: -10, // start query at block 10 from latest
	toBlock: 'latest', // end query at latest block
	topics: [quais.utils.id('Transfer(address,address,uint256)')], // Transfer event signature
}

const main = async () => {
	const logs = await provider.getLogs(filter)
	console.log(`\nLogs: ${JSON.stringify(logs)}\n`)
}

main()
