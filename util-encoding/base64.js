const { quais } = require('quais')

// String to decode
const toDecode = 'EjQ='

const main = () => {
	// Decode the string to Uint8Array
	const decoded = quais.utils.base64.decode(toDecode)
	console.log('\nThe string "' + toDecode + '" decoded using base64 encoding gives the Uint8Array: [ ' + decoded + ' ]\n')

	// Convert Uint8Array to hex string
	const hex = quais.utils.hexlify(decoded)
	console.log('The resulting Uint8Array: [ ' + decoded + ' ] converted to hex string gives: "' + hex + '"\n')

	// Encode the hex string to base64
	const encoded = quais.utils.base64.encode(hex)
	console.log(
		'The resulting hex string: "' + hex + '" encoded using base64 encoding gives the string: "' + encoded + '" that we started with.\n'
	)
}

main()