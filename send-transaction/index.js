const { quais } = require('quais')
const { pollFor } = require('quais-polling')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

// Define origin and destination accounts
// Note: This example is for a same shard transaction (internal transaction). Both of the addresses should be in the same shard.
const fromAddress = '0x1077b8213a19e34c790da18a0a7ce723b074344d' // cyprus1
const toAddress = '0x0a8d8036b058f11864bcb8e55f513c5d07ed5ca7' // cyprus1

// Define private key for wallet
const privateKey = process.env.PRIVKEY // loaded from .env file

// Create provider for wallet
const provider = new quais.providers.JsonRpcProvider(process.env.RPCURL) // loaded from .env file

// Create wallet for transaction
const wallet = new quais.Wallet(privateKey, provider)

const main = async () => {
	// Get account balances before transaction and log them
	const fromBalanceBefore = await provider.getBalance(fromAddress)
	const toBalanceBefore = await provider.getBalance(toAddress)
	console.log('\nFrom account balance before: ' + quais.utils.formatEther(fromBalanceBefore))
	console.log('\nTo account balance before: ' + quais.utils.formatEther(toBalanceBefore))

	// Build transaction
	const tx = {
		to: toAddress,
		value: quais.utils.parseEther('0.1'),
	}

	// Send transaction and use quais-polling to wait for confirmation
	const signedTx = await wallet.sendTransaction(tx)
	console.log('\nTransaction sent: ' + signedTx.hash)
	const txReceipt = await pollFor(provider, 'getTransactionReceipt', [signedTx.hash], 1.5, 1)
	console.log('\nTransaction confirmed: ' + txReceipt.transactionHash)

	// Get account balances after transaction and log them
	const fromBalanceAfter = await provider.getBalance(fromAddress)
	const toBalanceAfter = await provider.getBalance(toAddress)
	console.log('\nFrom account balance after: ' + quais.utils.formatEther(fromBalanceAfter))
	console.log('\nTo account balance after: ' + quais.utils.formatEther(toBalanceAfter) + '\n')
}

main()
