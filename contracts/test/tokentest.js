const Hipostel = artifacts.require('HipostelToken');

contract("Hipostel Token", ( accounts )=>{
    let contractInstance;
    before(async function(){
        contractInstance = await Hipostel.deployed();
        console.log("Token Instance:", contractInstance.address)
    })
    it("should check the statics of the contract", async()=>{
        const name = await contractInstance.name();
        const owner = await contractInstance.owner();
        const symbol = await contractInstance.symbol();
        const supply = await contractInstance.totalSupply();
        console.log("Token Name:",name, "(",symbol,")", " owned by:", owner, "with supply of", String(supply), "tokens")
        
    })
    it("should check the balance of accounts", async()=>{
        const balanceAcc1 = await contractInstance.balanceOf(accounts[0])
        const balanceAcc2 = await contractInstance.balanceOf(accounts[1])
        console.log("Balance of Add1: ", String(balanceAcc1), ", Balance of Add2: ", String(balanceAcc2) )
    })
    it("should transfer tokens from Acc1 ro Acc2", async()=>{
        const res = await contractInstance.transfer(accounts[1], 3000000000000000000000000n);
        const balanceAcc1 = await contractInstance.balanceOf(accounts[0])
        const balanceAcc2 = await contractInstance.balanceOf(accounts[1])
        console.log("Transfer Result", res.tx)
        console.log("New Balances:");
        console.log("Add1:", String(balanceAcc1));
        console.log("Add2:", String(balanceAcc2));
    })
    it("should delegate votes to self", async()=>{
        const votingBefore = await contractInstance.getVotes(accounts[0]);
        console.log("Voting Power Before:", String(votingBefore));
        const res = await contractInstance.delegate(accounts[0]);
        const votingAfter = await contractInstance.getVotes(accounts[0]);
        console.log("Voting Power After Delegation: ", String(votingAfter));
        const delegates = await contractInstance.delegates(accounts[0]);
        console.log("Account 0 delegates to: ", delegates);
    })
})
