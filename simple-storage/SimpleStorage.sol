// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;

    event ValueSet(uint256 value, address indexed sender);

    function set(uint256 value) public {
        storedValue = value;
        emit ValueSet(value, msg.sender);
    }

    function get() public view returns (uint256) {
        uint256 value = storedValue;
        return value;
    }
}
