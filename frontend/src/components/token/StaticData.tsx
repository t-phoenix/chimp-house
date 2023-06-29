// @ts-nocheck
import React from "react";
import { readContracts } from "@wagmi/core";
import { HIPtoken, TokenABI } from "../../helper/contract";
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
        // const tokenContract = {
        //     address: HIPtoken,
        //     abi: TokenABI
        // }
        console.log("Fetching data ....")
        const tokenData = await readContracts({
            contracts: [
                {
                    address: HIPtoken,
                    abi: TokenABI,
                    functionName: 'name',
                },
                {
                    address: HIPtoken,
                    abi: TokenABI,
                    functionName: 'symbol'
                },
                {
                    address: HIPtoken,
                    abi: TokenABI,
                    functionName: 'owner'
                },
                {
                    address: HIPtoken,
                    abi: TokenABI,
                    functionName: 'totalSupply'
                },
                {
                    address: HIPtoken,
                    abi: TokenABI,
                    functionName: 'decimals'
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
                    <p>Symbol: {result[1]}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>Supply: {toETHdenomination(Number(result[3]))}</p>
                    <p>Decimals: {result[4]}</p>

                </div>
                <p>Onwer: {result[2]}</p>
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