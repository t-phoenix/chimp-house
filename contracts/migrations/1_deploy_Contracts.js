const Token = artifacts.require('HipostelToken')
const TimelockContract = artifacts.require("TimelockContract");
const Governor = artifacts.require('HipostelGovernor');
const delay = 5;
const proposers= ['0x9970de3A60203CE6dBa1ac9aB5Ff03ac27C52aF3'];
const executors= ['0x9970de3A60203CE6dBa1ac9aB5Ff03ac27C52aF3'];
const admin = '0x9970de3A60203CE6dBa1ac9aB5Ff03ac27C52aF3';

module.exports = function(deployer, accounts){
    deployer.deploy(Token);
    deployer.deploy(TimelockContract, delay, proposers, executors, admin);
    // deployer.deploy(Governor, Token.address, TimelockController.address );
    deployer.deploy(Governor, Token.address, TimelockContract.address);
    
}
