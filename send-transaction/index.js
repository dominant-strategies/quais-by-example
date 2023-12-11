const { quais } = require('quais')
const { pollFor } = require('quais-polling')

// Define origin and destination accounts
// Note: This example is for a same shard transaction (internal transaction). Both of the addresses should be in the same shard.
const originAccount = '0x1077b8213a19e34c790da18a0a7ce723b074344d' // cyprus1
const destinationAccount = '0x0a8d8036b058f11864bcb8e55f513c5d07ed5ca7' // cyprus1

// Create provider for wallet
const provider = new quais.providers.JsonRpcProvider('https://rpc.cyprus1.colosseum.quaiscan.io')

// Define private key for wallet
const privateKey = '0x0000000000000000000000000000000000000000000000000000000000000000' // private key of originAccount

// Create wallet for transaction
const wallet = new quais.Wallet(privateKey, provider)

const main = async () => {
	// Get account balances before transaction and log them
	const originBalanceBefore = await provider.getBalance(originAccount)
	const destinationBalanceBefore = await provider.getBalance(destinationAccount)
	console.log('\nOrigin account balance before: ' + quais.utils.formatEther(originBalanceBefore))
	console.log('\nDestination account balance before: ' + quais.utils.formatEther(destinationBalanceBefore))

	// Build transaction
	const tx = {
		to: destinationAccount,
		value: quais.utils.parseEther('0.1'),
	}

	// Send transaction and use quais-polling to wait for confirmation
	const signedTx = await wallet.sendTransaction(tx)
	console.log('\nTransaction sent: ' + signedTx.hash)
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [signedTx.hash], 1.5, 1)
	console.log('\nTransaction confirmed: ' + txReceipt.transactionHash)

	// Get account balances after transaction and log them
	const originBalanceAfter = await provider.getBalance(originAccount)
	const destinationBalanceAfter = await provider.getBalance(destinationAccount)
	console.log('\nOrigin account balance after: ' + quais.utils.formatEther(originBalanceAfter))
	console.log('\nDestination account balance after: ' + quais.utils.formatEther(destinationBalanceAfter) + '\n')
}

main()