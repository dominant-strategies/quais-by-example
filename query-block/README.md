# query-block

This example shows how to query block data using the quais SDK. It is comprised of a single example script.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/query-block`) and run:

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
const rpcURL = 'https://rpc.paxos1.colosseum.quaiscan.io' // paxos 1 rpc url
const blockNumber = '0x1234' // paxos 1 block 4660
```

Ensure that the `rpcURL` you provide is for the same chain as the block you intend to query. Once you've specified the block number and RPC URL, you can run the script with:

```bash
node index.js
```

The script will output the block data in JSON format.
