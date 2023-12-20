# util-grind-address

This example shows how to grind a smart contract address to be valid in a specific Quai shard.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/util-grind-address`) and run:

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

The `index.js` script takes in smart contract ABI, bytecode, an `rpcURL`, and private key for a shard specific address. The private key and RPC URL loaded from your .env file will be used to simulate a transaction that will grind the address.

We get the smart contract ABI and bytecode by importing a QRC20 json file. You can find the QRC20 json files in the [solidityX contracts repo](https://github.com/dominant-strategies/SolidityX-Contracts). We then specify the `rpcURL` and private key for the chain we want to grind the contract address for, in this case, Cyprus 1.

The script will then print the entire grinded transaction data to the console, which contains the grinded address.
