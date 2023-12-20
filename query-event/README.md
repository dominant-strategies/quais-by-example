# query-event

This example shows how to query smart contract event data using the quais SDK. It is comprised of a single example script that queries the `Transfer` event of a QRC20 token contract for a single address.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/query-event`) and run:

```bash
npm install
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The `index.js` script takes in a contract address, event to query for, and event filter params. To run the script, you'll need to edit the `contractAddress`, `eventName`, and `eventFilterParams` variables. In the example script, we query the `Transfer` event of a QRC20 token contract that involve the address: `0x1077b8213a19e34c790da18a0a7ce723b074344d`.

```js
const rpcURL = 'https://rpc.cyprus1.colosseum.quaiscan.io' // cyprus 1 rpc url
const contractAddress = '0x0dcb6cc8516568104758705b8320924cdca5bd44' // cyprus 1 qrc20 contract

// event to query for
const filterFrom = QRC20.filters.Transfer('0x1077b8213a19e34c790da18a0a7ce723b074344d') // filter for transfers from this address
```

Ensure that the `rpcURL` you provide is for the same chain that the `contractAddress` and queried `address` are on. Once you've done that, you can run the script with:

```bash
node index.js
```

This script will output the event data that matches your filter params in JSON format.
