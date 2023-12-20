# query-logs

This example shows how to query logs for smart contracts, transactions, or blocks. It is comprised of a single example script that queries logs with the `Transfer` method event signature of a QRC20 token contract.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/query-logs`) and run:

```bash
npm install
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The `index.js` script takes in a filter object with instructions on block ranges and event signatures to query for. To run the script, you'll need to edit the `filter` variable. 

```js
const filter = {
	fromBlock: -10, // start query at block 10 from latest
	toBlock: 'latest', // end query at latest block
	topics: [quais.utils.id('Transfer(address,address,uint256)')], // Transfer event signature
}
```

Ensure that the `rpcURL` you provide is for the chain you want to query logs for. Once you've done that, you can run the script with:

```bash
node index.js
```

This script will output any log data that matches your filter params in JSON format.
