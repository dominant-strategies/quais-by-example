# contract-qrc721

This example shows how to **multi-chain deploy and interact with a QRC721 contract**. This example does not provide instructions on how to mint QRC721 collections or link IPFS metadata to specific tokenIds. It is intended to be a starting point for developers who want to deploy a QRC721 contract on Quai Network.

The example is comprised of 2 scripts:

- [1_deploy_and_link_qrc721.js](./1_deploy_and_link_qrc721.js) - multi-chain deploy a QRC20 contract and link all sister contracts
- [2_interact_qrc721.js](./2_interact_qrc721.js) - send NFTs from one address to another (on any shard) using a QRC20 contract

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK
- [`quais-polling`](https://www.npmjs.com/package/quais-polling) - polling provider for Quai
- [`dotenv`](https://www.npmjs.com/package/dotenv) - environment variable loader

## Usage

To install dependencies, navigate to this directory [`quais-by-example/contract-qrc721`](../contract-qrc721/) and run:

```bash
npm install
```

Create a local `.env` file from the template `.env.example` and fill in the values:

```bash
cp .env.example .env
```

Use nodejs to run any of the scripts in this example. For example:

```bash
node 1_deploy_qrc721.js
```

## Example Breakdown

### 1_deploy_qrc721.js

This script deploys an inidividual QRC721 contract to more than one chain within Quai Network and links them together. It is comprised of two parts:

- `deployQRC721` - deploys a QRC721 contract to a single chain
- `linkQRC721` - links a QRC721 contract to a sister contract on a different chain

These functions will be looped over for each chain you specify in the `deployConfig` object. You'll need to edit the `deployConfig` object to match your desired deployment configuration.

You'll also need to edit the `constructorArgs` object to match your desired QRC721 contract configuration. **Note:** the sister contracts are not aware of each other's mint status. This is relevant if you plan to mint unique tokens. To prevent minting duplicates across each chain, you'll need to implement a custom solution.

```js
const constructorArgs = {
	name: 'Test QRC721',
	symbol: 'TQ721',
	baseURI: 'ipfs://METADATA_CID/',
}
```

Once you've done the above, you can run the script with:

```bash
node 1_deploy_and_link_qrc721.js
```

Once the script completes, you'll have a fully linked network of QRC721 contracts across multiple chains. This will allow you to send NFTs from one chain to another via the `transferFrom` function in the QRC721 contract.

### 2_interact_qrc721.js

This script builds a transaction to send an NFT from a specified address to another on a single chain. If you provide a toAddress on a different shard **and** you have not deployed a sister contract on that shard, the transaction will fail.

To configure the send, you'll need to provide the following:

- `rpcURL` - the RPC URL of the chain you want to send the transaction on loaded from .env
- `privKey` - the private key of the address you want to send the transaction from loaded from .env
- `contractAddress` - the address of the QRC721 contract you want to interact with
- `toAddress` - the address you want to send NFTs to

Once you've configured the variables above in the script, you can run it with:

```bash
node 2_interact_qrc721.js
```
