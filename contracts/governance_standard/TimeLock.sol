// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    //minDelay How long you have to wait before executing
    // proposer: It is the list of addresses that can propose
    //executors: Who can executes when a proposal passes
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
