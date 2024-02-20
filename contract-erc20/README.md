# contract-erc20

This example shows how to **deploy and interact with an ERC20** on a single shard within Quai Network.

It is comprised of 2 example scripts:

- [1_deploy_erc20.js](./1_deploy_erc20.js) - single-chain deploy a ERC20 token on one shard
- [2_interact_erc20.js](./2_interact_erc20.js) - send tokens from one address to another one shard

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK
- [`quais-polling`](https://www.npmjs.com/package/quais-polling) - polling provider for Quai
- [`dotenv`](https://www.npmjs.com/package/dotenv) - environment variable loader

## Usage

To install dependencies, navigate to this directory [`quais-by-example/contract-erc20`](../contract-erc20/) and run:

```bash
npm install
```

Create a local `.env` file from the template `.env.example` and fill in the values:

```bash
cp .env.example .env
```

Use nodejs to run any of the scripts in this example. For example:

```bash
node 1_deploy_erc20.js
```

## Example Breakdown

### 1_deploy_erc20.js

This script deploys an inidividual ERC20 token contract to a single shard within Quai Network. It is comprised of two parts:

There are two important configuration objects in this script: `constructorArgs` and `deployConfig`.

The `constructorArgs` object is used to configure the ERC20 token you want to deploy. You'll need to edit the `constructorArgs` object with your token data, i.e. `name`, `symbol`, and `totalSupply`.

```js
const constructorArgs = {
	name: 'Test ERC20 Token',
	symbol: 'TE20',
	totalSupply: 1000000000000,
}
```

The `deployConfig` object is used to configure the chain you want to deploy to. You'll need to edit the `deployConfig` object with your chain data, i.e. `name`, `rpcURL`, and `privKey`. To change the chain you want to deploy to, you'll need to edit the `rpcURL` and `privKey` variables, for example to deploy to Paxos1, we'll change the `rpcURL` and `privKey` to `PAXOS1URL` and `PAXOS1PK` respectively.

```js
const deployConfig = {
	name: 'cyprus1', // name of the chain you want to deploy to (optional, just for logging purposes)
	rpcURL: process.env.CYPRUS1URL, // rpc endpoint for the chain you want to deploy to loaded from .env file
	privKey: process.env.CYPRUS1PK, // private key of the address you want to deploy from loaded from .env file
}
```

Once you've done the above, you can run the script with:

```bash
node 1_deploy_erc20.js
```

Once the script completes, you'll have a deployed instance of your ERC20 token on one shard.

### 2_interact_erc20.js

This script builds a transaction to send tokens from a specified address to another on a single shard using your deployed ERC20 contract. If you specify an address on another shard, the transaction will fail.

To configure the send, you'll need to provide the following:

- `rpcURL` - the RPC URL of the chain you want to send the transaction on
- `privKey` - the private key of the address you want to send the transaction from
- `contractAddress` - the address of the ERC20 token contract you want to interact with
- `toAddress` - the address you want to send tokens to

Once you've configured the variables above in the script, you can run it with:

```bash
node 2_interact_erc20.js
```
