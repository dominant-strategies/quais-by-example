const { quais } = require('quais')
const { pollFor } = require('quais-polling')

// Define provider
const provider = new quais.providers.JsonRpcProvider('http://rpc.cyprus1.colosseum.quaiscan.io')

// Define private key for wallet to send from
const privKey = '0x7800a20e29ba736fd476eb89e2ceadd2afc231fe53e8d016b5d16d8c8274bc80'

// Define wallet
const wallet = new quais.Wallet(privKey, provider)
const originAddress = wallet.address

// Define address to send to
const destinationAddress = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const getEtxGasMultiplier = async (originShard, destinationShard) => {
	// split shard names
	const origin = originShard.split('-')
	const destination = destinationShard.split('-')

	// get origin region and zone
	const originRegion = parseInt(origin[1], 10)
	const originZone = parseInt(origin[2], 10)

	// get destination region and zone
	const destinationRegion = parseInt(destination[1], 10)
	const destinationZone = parseInt(destination[2], 10)

	// compare regions and zones and return multiplier
	if (originRegion === destinationRegion) {
		if (originZone === destinationZone) {
			return 1 // same shard
		} else {
			return 3 // same region
		}
	} else {
		return 9 // different region
	}
}

const main = async () => {
	// get the shards of the addresses
	const originShard = quais.utils.getShardFromAddress(originAddress)
	const destinationShard = quais.utils.getShardFromAddress(destinationAddress)

	// compare the shard names to get the etx gas multiplier
	const etxGasMultiplier = await getEtxGasMultiplier(originShard, destinationShard)
	const tx = {
		from: originAddress,
		to: destinationAddress,
		value: quais.utils.parseEther('0.1'),
		gasLimit: 21000 * etxGasMultiplier,
	}

	// send the transaction
	const signedTx = await wallet.sendTransaction(tx)
	console.log('\nTransaction sent: ' + signedTx.hash)
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [signedTx.hash], 1.5, 1)
	console.log('\nTransaction confirmed on origin chain: ' + txReceipt.transactionHash)
}

main()
