# contract-qrc20

This example shows how to **deploy, interact, and multi-chain deploy a QRC20 token**. It is comprised of 3 example scripts:

- [1_deploy_qrc20.js](./1_deploy_qrc20.js) - deploy a QRC20 token on a single chain
- [2_interact_qrc20.js](./2_interact_qrc20.js) - interact with a QRC20 token on a single chain
- [3_deploy_and_link_qrc20.js](./3_deploy_qrc20_multi.js) - multi-chain deploy a QRC20 token and link all sister contracts

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK
- [`quais-polling`](https://www.npmjs.com/package/quais-polling) - polling provider for Quai

## Usage

To install dependencies, navigate to this directory (`quais-by-example/contract-qrc20`) and run:

```bash
npm install
```

Use nodejs to run any of the scripts in this example. For example:

```bash
node 1_deploy_qrc20.js
```

## Example Breakdown

### 1_deploy_qrc20.js

This script **deploys a single QRC20 token contract to a single chain** within Quai Network. Inside of the script, you'll find two relevant deployment configuration objects:

- `constructorArgs` - the arguments (name, symbol, totalSupply) that will be passed to the QRC20 token contract
- `deployConfig` - configuration for the deployment of the QRC20 token contract

```js
const constructorArgs = {
	'Quai Token', // name
	'QUAI', // symbol
	'1000000000000000000000000000', // totalSupply
}
```

```js
const deployConfig = {
	name: 'cyprus1',
	rpcURL: 'https://rpc.cyprus1.colosseum.quaiscan.io',
	privKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
}
```

You'll need to edit both of these objects to match your desired deployment configuration. Once you've done that, you can run the script with:

```bash
node 1_deploy_qrc20.js
```

### 2_interact_qrc20.js

This script builds a transaction to send tokens from a specified address to another. If you provide a toAddress on a different shard than the sender **and** you have not deployed a sister contract on that shard, the transaction will fail.

To configure the send, you'll need to provide the following:

- `rpcURL` - the RPC URL of the chain you want to send the transaction on
- `privKey` - the private key of the address you want to send the transaction from
- `contractAddress` - the address of the QRC20 token contract you want to interact with
- `toAddress` - the address you want to send tokens to

Once you've configured the variables above in the script, you can run it with:

```bash
node 2_interact_qrc20.js
```

### 3_deploy_qrc20_multi.js

This script deploys a QRC20 token contract to multiple chains within Quai Network. It is comprised of two parts:

- `deployQRC20` - deploys a QRC20 token contract to a single chain
- `linkQRC20` - links a QRC20 token contract to a sister contract on a different chain

These functions will be looped over for each chain you specify in the `deployConfig` object. You'll need to edit the `deployConfig` object to match your desired deployment configuration.

You'll also need to edit the `constructorArgs` object to match your desired QRC20 token configuration. **Note:** the `totalSupply` argument will be replicated for each chain's deployment. If you want to have different total supplies for each chain, you'll need to change the script configuration.

Once you've done the above, you can run the script with:

```bash
node 3_deploy_qrc20_multi.js
```

Once the script completes, you'll have a fully linked network of QRC20 contracts across multiple chains. This will allow you to send tokens from one chain to another via the `crossTransfer` function in the QRC20 contract.
