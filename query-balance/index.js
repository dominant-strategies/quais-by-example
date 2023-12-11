const { quais } = require('quais')

// Create provider to query against
const provider = new quais.providers.JsonRpcProvider(`https://rpc.cyprus1.colosseum.quaiscan.io`)

// Address to query balance for
const address = '0x12d93219393DD6365552e5c8F3ea011C8c1F2edB'

const main = async () => {
	// Query provider for balance of address
	const balance = await provider.getBalance(address)
	console.log(`\nQUAI Balance of ${address} --> ${quais.utils.formatEther(balance)} QUAI\n`)
}

main()