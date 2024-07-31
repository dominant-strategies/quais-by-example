
/* Example contract:
* // SPDX-License-Identifier: MIT
* pragma solidity ^0.8.0;
* 
* contract SimpleStorage {
*     uint256 private storedValue;
* 
*     event ValueSet(uint256 value, address indexed sender);
* 
*     function set(uint256 value) public {
*         storedValue = value;
*         emit ValueSet(value, msg.sender);
*     }
* 
*     function get() public view returns (uint256) {
*         uint256 value = storedValue;
*         return value;
*     }
* }
*
*/

const quais = require('quais');
const fs = require('fs');
require('dotenv').config();

// Prerequisites: compile the smart contract and generate artifacts, i.e. run:
// solc --bin --abi SimpleStorage.sol --output-dir artifacts 

const abi = JSON.parse(fs.readFileSync('artifacts/SimpleStorage.abi', 'utf8'));
const bytecode = fs.readFileSync('artifacts/SimpleStorage.bin', 'utf8');

async function main() {
	const RPC_URL = 'http://localhost';
	const provider = new quais.JsonRpcProvider(RPC_URL);
	
	const wallet = new quais.Wallet(process.env.CYPRUS1PK, provider);
	console.log('Wallet address:', wallet.address);

	// get address balance
	let balance = await provider.getBalance(wallet.address);
	console.log('Balance:', balance.toString());
	
	// Deploy contract	
	const factory = new quais.ContractFactory(abi, bytecode, wallet);
	
	let nonce = await provider.getTransactionCount(wallet.address, 'latest');
	
	gasLimit = 8400000;
	maxFeePerGas = 1000000000n;
	maxPriorityFeePerGas = 1000000000n;

	const deployParams = {
		nonce,
		gasLimit: gasLimit,
		maxPriorityFeePerGas: maxFeePerGas,
		maxFeePerGas: maxPriorityFeePerGas,
		from: wallet.address,
	};

	const deployTransaction = await factory.getDeployTransaction(deployParams);

	// Modify the deploy transaction
	const modifiedDeployTransaction = {
		...deployTransaction,
		// Replace or add fields as needed
		gasLimit: "0x" + (gasLimit).toString(16),
		maxFeePerGas: "0x" + (maxFeePerGas).toString(16),
		maxPriorityFeePerGas: "0x" + (maxPriorityFeePerGas).toString(16),
		nonce: "0x" + nonce.toString(16)
	};
	
	const accessListResponse = await provider.send("quai_createAccessList", [modifiedDeployTransaction, "latest"], quais.Shard.Cyprus1);

	// Format the accessList
	const formattedAccessList = accessListResponse.accessList.map(item => ({
		address: quais.getAddress(item.address),  // Ensure the address is correctly formatted
		storageKeys: item.storageKeys.map(key => quais.hexlify(key))  // Ensure storage keys are correctly formatted
	}));

	console.log('Formatted accessList:', formattedAccessList);

	const accessListTransaction = {
		...deployParams,
		accessList: formattedAccessList
	};

	let contract = await factory.deploy(accessListTransaction);
	const contractAddress = await contract.getAddress();
	console.log('Contract address:', contractAddress);

	// wait for contract to be deployed
	const receipt = await contract.waitForDeployment(); 
	console.log('receipt:', receipt);

	// Subscribe to events
	contract.on('ValueSet', (value, sender) => {
		console.log(`\n\n'ValueSet' event detected => value: ${value.toString()}, sender: ${sender}\n\n`);
	});
	
	// Write to contract	
	contract = new quais.Contract(contractAddress, abi, wallet);
	
	const tx = await contract.set(42);
	console.log('Transaction:', tx);
	
	await tx.wait();
	console.log('Value set in contract');
	
	// Read from contract
	contract = new quais.Contract(contractAddress, abi, wallet);
	const value = await contract.get();
	console.log('Stored value in contract:', value.toString());
}

main()
.then(() => process.exit(0))
.catch((error) => {
	console.error(error);
	process.exit(1);
});