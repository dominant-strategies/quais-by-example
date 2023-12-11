const { quais } = require('quais')

// Example address
const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const main = () => {
	const shard = quais.utils.getShardFromAddress(address)
	console.log('\nThe provided address ' + address + ' is located in shard ' + shard + '.\n')
}

main()