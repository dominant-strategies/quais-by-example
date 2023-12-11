const { quais } = require('quais')

// Hex data to encode
const toEncode = '0x87654321'

const main = () => {
	// RLP encode the hex
	const encoded = quais.utils.RLP.encode(toEncode)
	console.log('\nThe hex "' + toEncode + '" encoded using RLP encoding gives "' + encoded + '"\n')

	// Decode the RLP encoded hex
	const decoded = quais.utils.RLP.decode(encoded)
	console.log(
		'The RLP encoded hex: "' + encoded + '" decoded using RLP encoding gives the string: "' + decoded + '" that we started with.\n'
	)
}

main()