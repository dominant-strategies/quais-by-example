const { quais } = require('quais')

// String to decode
const toDecode = '2zey3'

const main = () => {
	// Decode the string to Uint8Array
	const decoded = quais.utils.base58.decode(toDecode)
	console.log('\nThe string "' + toDecode + '" decoded using base58 encoding gives the Uint8Array: [ ' + decoded + ' ]\n')

	// Convert Uint8Array to hex string
	const hex = quais.utils.hexlify(decoded)
	console.log('The resulting Uint8Array: [ ' + decoded + ' ] converted to hex string gives: "' + hex + '"\n')

	// Encode the hex string to base58
	const encoded = quais.utils.base58.encode(hex)
	console.log(
		'The resulting hex string: "' + hex + '" encoded using base58 encoding gives the string: "' + encoded + '" that we started with.\n'
	)
}

main()