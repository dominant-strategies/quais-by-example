# send-transaction

This example shows how to for and **send an internal transaction on any Quai chain**.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK
- [`quais-polling`](https://www.npmjs.com/package/quais-polling) - polling provider for quais

## Usage

To install dependencies, navigate to this directory (`quais-by-example/send-transaction`) and run:

```bash
npm install
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The `index.js` script requires a few variables to be set before it can run properly:

- `rpcURL` - the RPC URL of the chain you want to send from
- `privateKey` - the private key of the address you want to send from
- `fromAddress` - the address you want to send from
- `toAddress` - the address you want to send to

Once you've set each of these variables, you can run the script with:

```bash
node index.js
```

The script will take in these variables, compute the balances of each address, and send the transaction. It will then print the transaction hash to the console along with the balances of each address after the transaction has been mined.

The script is not designed to handle or compute gas for external transactions, so if you provide 2 addresses on different chains, the transaction will fail.
