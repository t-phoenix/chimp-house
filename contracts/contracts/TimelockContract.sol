// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimelockContract is TimelockController {
    constructor(uint256 delay, address[] memory proposers, address[] memory executors, address admin) TimelockController(delay, proposers, executors, admin) {}
}