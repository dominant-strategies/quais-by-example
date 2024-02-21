# quais-by-example

`quais-by-example` is collection of example scripts for the [quais sdk](https://www.npmjs.com/package/quais). The [quais sdk](https://github.com/dominant-strategies/quais-5.js) is a fork of [ethers v5.7.2](https://docs.ethers.org/v5/) with added functionality for Quai Network's multi-chain architecture.

## Dependencies

While each one of the examples in this repository has its own dependency list, they all depend on the following packages:

- [quais](https://www.npmjs.com/package/quais) - quais sdk
- [quais-polling](https://www.npmjs.com/package/quais-polling) - polling provider for quais

## Usage

Each example is an individually packaged example with its own `package.json` that contains relevant dependencies. To configure an example, simply navigate to an example directory with:

```bash
cd <example-name>
```

and install the dependencies with:

```bash
npm install
```

To run an example, you can use the `node` command:

```bash
node <example-script-name>.js
```

## Overview

This repository has four main categories of examples:

- **Utilities**: basic encoding and address utils
- **Queries**: querying data from any Quai chain
- **Transactions**: sending internal and external transactions
- **Contracts**: single and multi-chain contracts

### Utilities

- [util-bytes](./util-bytes/) - basic encoding and decoding of bytes
- [util-encoding](./util-encoding/) - base58, base64, and RLP encoding
  - [base58](./util-encoding/base58.js) - base58
  - [base64](./util-encoding/base64.js) - base64
  - [rlp](./util-encoding/rlp.js) - RLP
- [util-grind-address](./util-grind-address/) - grind a smart contract address to be valid in a specific Quai shard
- [util-shard-from-address](./util-shard-from-address/) - get the shard name from the byte prefix of an address

### Queries

- [query-balance](./query-balance/) - query the balance of an address on any Quai chain
- [query-block](./query-block/) - query a block on any Quai chain
- [query-logs](./query-logs/) - query logs for smart contracts, transactions, or blocks
- [query-event](./query-event/) - query smart contract event logs

### Transactions

- [send-transaction](./send-transaction/) - send an internal transaction
- [send-etx](./send-etx/) - send an external transaction to any Quai chain

### Contracts

- [contract-erc20](./contract-erc20/) - deploy and interact with ERC20 token
  - [1_deploy_erc20.js](./contract-erc20/1_deploy_erc20.js) - deploy a ERC20 token
  - [2_interact_erc20.js](./contract-erc20/2_interact_erc20.js) - interact with a ERC20 token
- [contract-erc721](./contract-qrc721/) - deploy and interact with a ERC721 token
  - [1_deploy_erc721.js](./contract-erc721/1_deploy_erc721.js) - deploy a ERC721 token
  - [2_interact_erc721.js](./contract-erc721/2_interact_erc721.js) - interact with a ERC721 token
- [contract-qrc20](./contract-qrc20/) - deploy, interact, and multi-chain deploy a QRC20 token
  - [1_deploy_and_link_qrc20.js](./contract-qrc20/1_deploy_and_link_qrc20.js) - multi-chain deploy a QRC20 token
  - [2_interact_qrc20.js](./contract-qrc20/2_interact_qrc20.js) - interact with a QRC20 token
- [contract-qrc721](./contract-qrc721/) - deploy, interact, and multi-chain deploy a QRC721 token
  - [1_deploy_and_link_qrc721.js](./contract-qrc721/1_deploy_and_link_qrc721.js) - multi-chain deploy a QRC721 token
  - [2_interact_qrc721.js](./contract-qrc721/2_interact_qrc721.js) - interact with a QRC721 token
