// @ts-nocheck
import React from "react";
import { readContracts } from "@wagmi/core";
import { HIPGovernor, GovernorABI } from "../../helper/contract";
// import "../../styles/proposalstyle.css";
// import FormField from "../FormField";
import { toETHdenomination } from "../../helper/formatter";

export default function StaticData() {
    // const [tokenAddr, setTokenAddr] = React.useState();
    const [result, setResult] = React.useState([]);

    React.useEffect(() => {
        FetchTokenData()
        
    }, [])



    async function FetchTokenData() {
        
        console.log("Fetching data ....")
        const tokenData = await readContracts({
            contracts: [
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'name',
                },
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'token'
                },
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'votingDelay'
                },
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'votingPeriod'
                },
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'quorumNumerator'
                },
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'quorumDenominator'
                },
                {
                    address: HIPGovernor,
                    abi: GovernorABI,
                    functionName: 'proposalThreshold'
                },
            ]
        })
        console.log("Token Data:", tokenData)
        setResult(tokenData)

    }

    return (
        <div className="formContainer" style={{borderWidth: 2, display: 'flex', flexDirection:'column',  justifyContent: "center", margin: 4, padding: 8}}> 
            {/* <form className="formInputs">
                <h4>General Data</h4>
                <FormField
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e) => setTokenAddr(e.target.value)}
                />
            </form>
            */}

            <button onClick={FetchTokenData} style={{borderWidth: 2, borderRadius: 16, paddingInline: 12, paddingBlock: 6}}>
                Get Data
            </button> 
            <>
            {result ? 
            (<div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>Name: {result[0]}</p>
                    <p>Token: {result[1]}</p>
                    <p>Proposal Threshold: {toETHdenomination(Number(result[6]))}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>VotingDelay: {Number(result[2])}</p>
                    <p>Voting Period: {Number(result[3])}</p>
                    <p>Quorum: {Number(result[4])}/ {Number(result[5])}</p>

                </div>
            </div>)
            :
            (<div>
                <p>Couldn't get data</p>
            </div>)
            }
            </>
        </div>
    )
}