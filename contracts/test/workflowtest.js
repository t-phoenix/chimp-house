const Token = artifacts.require('HipostelToken');
const TimelockContract = artifacts.require('TimelockContract');
const GovernorContract = artifacts.require('HipostelGovernor')

contract("WorkFlow", (accounts)=>{
    let tokenInstance, timelockInstance, governorInstance;
    before(async function(){
        tokenInstance = await Token.deployed();
        console.log("Token Instance: ", tokenInstance.address);

        timelockInstance = await TimelockContract.deployed(5, [accounts[0]], [accounts[0]], accounts[0]);
        console.log("Timelock Instance: ", timelockInstance.address);

        governorInstance = await GovernorContract.deployed(tokenInstance.address, timelockInstance.address);
        console.log("Governor Instance: ",governorInstance.address);

    })
    it("should print token Details", async()=>{
        const name = await tokenInstance.name();
        const owner = await tokenInstance.owner();
        const symbol = await tokenInstance.symbol();
        const supply = await tokenInstance.totalSupply();
        console.log("Token Name:",name, "(",symbol,")", " owned by:", owner, "with supply of", String(supply), "tokens")
    })
    it("should print governor details", async()=>{
        const name = await governorInstance.name();
        const votingDelay = await governorInstance.votingDelay();
        const votingPeriod = await governorInstance.votingPeriod();
        const threshold = await governorInstance.proposalThreshold();
        const tokenAddr = await governorInstance.token();
        console.log("Governor Name: ",name, "voting delay: ", String(votingDelay), "voting Period: ", String(votingPeriod), "threshold: ", String(threshold));
        console.log("Governor Token: ", tokenAddr);
    })
})