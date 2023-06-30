// @ts-nocheck
import React, { useEffect } from "react";
import FormField from "../FormField";
import { HIPtoken, TokenABI } from "../../helper/contract";
// import "../../styles/proposalstyle.css";
import { readContract } from "@wagmi/core";
import { toETHdenomination } from "../../helper/formatter";


export default function Balance() {
    // const [tokenAddr, setTokenAddr] = React.useState();
    const [userAddr, setUserAddr] = React.useState('');
    const [result, setResult] = React.useState('');
    // console.log("Inside Delegation Component", token)


    useEffect(() => {
        // if (token) {
        //     setTokenAddr(token.tokenAddr);
        // }
    }, [])

    async function HandleGetBalance() {
        console.log("-->", HIPtoken, userAddr)

        const data = await readContract({
            address: HIPtoken,
            abi: TokenABI,
            functionName: 'balanceOf',
            args: [userAddr]
        })


        console.log("AFTRE Balance ATTEMPT:", data, toETHdenomination(Number(data)));
        setResult(toETHdenomination(Number(data)));
    }

    async function HandleGetVotes() {
        console.log("-->", HIPtoken, userAddr)

        const data = await readContract({
            address: HIPtoken,
            abi: TokenABI,
            functionName: 'getVotes',
            args: [userAddr]
        })
        console.log("Fetch Voting Power ATTEMPT:", data, toETHdenomination(Number(data)));
        setResult(Number(toETHdenomination(data)));
    }

    return (
        <div className="formContainer" style={{borderWidth: 2, display: 'flex', flexDirection:'column',  justifyContent: "center", margin: 4, padding: 8}}>
            <form className="formInputs">
                <h4>Balance/Votes of User</h4>
                {/* <FormField
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e) => setTokenAddr(e.target.value)}
                /> */}
                <FormField
                    labelName="User"
                    placeholder="address"
                    inputType="text"
                    value={userAddr}
                    handleChange={(e) => setUserAddr(e.target.value)}
                />
            </form>

            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBlock: '12px', }}>
                <button onClick={HandleGetBalance} style={{borderWidth: 2, borderRadius: 16, paddingInline: 12, paddingBlock: 6}}>
                    Get Balance
                </button>
                <button onClick={HandleGetVotes} style={{borderWidth: 2, borderRadius: 16, paddingInline: 12, paddingBlock: 6}}>
                    Get Votes
                </button>
            </div>

            <div>
                {result && <p>Result: {result}</p>}
            </div>
        </div>
    )
}