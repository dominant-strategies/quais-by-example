# send-etx

This example shows how to correctly estimate gas for and **send an external transaction to any Quai chain**.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK
- [`quais-polling`](https://www.npmjs.com/package/quais-polling) - polling provider for quais

## Usage

To install dependencies, navigate to this directory (`quais-by-example/send-etx`) and run:

```bash
npm install
```

Create a local `.env` file from the template `.env.example` and fill in the values:

```bash
cp .env.example .env
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The `index.js` script requires a few variables to be set before it can run properly:

- `rpcURL` - the RPC URL of the chain you want to send from, loaded from your .env file
- `privateKey` - the private key of the address you want to send from, loaded from your .env file
- `desintationAddress` - the address you want to send to

Once you've set each of these variables, you can run the script with:

```bash
node index.js
```

The script will take in these variables, compute the appropriate gas limit using `getEtxGasMultiplier`, and send the transaction. It will console out the origin chain transaction hash once the transaction has been mined on the origin chain. **Note:** this does not mean that the transaction has been mined on the destination chain, which will take some time depending on which shard the destination address is on.

The script is also designed to handle internal transactions, so if you provide 2 addresses on the same chain, the script will send an internal transaction instead of an external transaction.
