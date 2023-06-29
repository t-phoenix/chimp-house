// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import FormField from "../FormField";
import { TokenABI, HIPtoken } from "../../helper/contract";
import { toWeiDenomination } from "../../helper/formatter";

export default function Transfer (){
    const [sendTo, setSendTo] = useState('');
    const [amount, setAmount] = useState(0);

    const { config } = usePrepareContractWrite({
        address: HIPtoken,
        abi: TokenABI,
        functionName: 'transfer',
        args: [sendTo, String(toWeiDenomination(amount))]
    })
    const {data, write} = useContractWrite(config)

    function HandleTransfer(){
        console.log("-->", HIPtoken, sendTo,': ', toWeiDenomination(amount));
       
        const transfer = write();
        console.log("AFTRE TRANSFER ATTEMPT:", transfer);

    }

    return(
        <div className="formContainer" style={{borderWidth: 2, display: 'flex', flexDirection:'column',  justifyContent: "center", margin: 4, padding: 8}}>
            <form className="formInputs">
                <h4>Transfer Tokens</h4>
                {/* <p align="left" >Delegate votes to yourself or another address to initialise voting power.</p> */}
                <FormField 
                    labelName="Send To"
                    placeholder="address"
                    inputType="text"
                    value={sendTo}
                    handleChange={(e)=> setSendTo(e.target.value)}
                />
                <FormField 
                    labelName="Amount"
                    placeholder="token"
                    inputType="numeric"
                    value={amount}
                    handleChange={(e) => setAmount(e.target.value)}
                />                
            </form>

            <button onClick={HandleTransfer} style={{borderWidth: 2, borderRadius: 16, paddingInline: 12, paddingBlock: 16}}>
                    Submit Transaction
            </button>
        </div>
    )
}