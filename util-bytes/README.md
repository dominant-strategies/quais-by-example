# util-bytes

This example shows how to encode and decode bytes using the quais SDK.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/util-bytes`) and run:

```bash
npm install
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The script showcases 3 different methods of byte manipulation via quais:

- `hexToUint8Array` - converts a hex string to a Uint8Array
- `uint8ArrayToHex` - converts a Uint8Array to a hex string
- `objectToHex` - converts an object to a hex string

You can provide your own hex string, Uint8Array, or object to the script by editing the `hexString`, `uint8Array`, and `object` variables:

```js
const hex = '0x1234567890abcdef'
const uint8Array = new Uint8Array([18, 52, 86, 120, 144, 171, 205, 239])
const object = { length: 3, 0: 1, 1: 2, 2: 3 }
```

Once you've set each of these variables, you can run the script with:

```bash
node index.js
```

The script will convert each of the provided variables to the other 2 types and print them to the console.
