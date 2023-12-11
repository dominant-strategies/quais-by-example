const { quais } = require('quais')

// Example hex string
const hex = '0x1234567890abcdef'

// Example Uint8Array
const uint8Array = new Uint8Array([18, 52, 86, 120, 144, 171, 205, 239])

// Example object
const object = { length: 3, 0: 1, 1: 2, 2: 3 }

const main = () => {
	// Convert hex string to Uint8Array
	const hexToUint8Array = quais.utils.arrayify(hex)
	console.log('\nThe hex string "' + hex + '" converted to Uint8Array gives: [ ' + hexToUint8Array + ' ].\n')

	// Convert Uint8Array to hex string
	const uint8ArrayToHex = quais.utils.hexlify(uint8Array)
	console.log('The Uint8Array [ ' + uint8Array + ' ] converted to hex string gives: "' + uint8ArrayToHex + '".\n')

	// Convert object to hex string
	const objectToHex = quais.utils.hexlify(object)
	console.log('The object ' + JSON.stringify(object) + ' converted to hex string gives: "' + objectToHex + '".\n')
}

main()