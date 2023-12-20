# query-balance

This example shows how to query the balance of an address using the quais SDK. It is comprised of a single example script.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/query-balance`) and run:

```bash
npm install
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The `index.js` script takes in a single address and queries the balance of that address. To run the script, you'll need to edit the `rpcURL` and `address` variables:

```js
const rpcURL = 'https://rpc.cyprus1.colosseum.quaiscan.io' // cyprus 1 rpc url
const address = '0x12d93219393DD6365552e5c8F3ea011C8c1F2edB' // cyprus 1 address
```

Ensure that the `rpcURL` you provide is for the same chain that the `address` is on. Once you've done that, you can run the script with:

```bash
node index.js
```

The script will output the balance of the address in wei. 
