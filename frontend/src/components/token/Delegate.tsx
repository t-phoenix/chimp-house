// @ts-nocheck
import React, { useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import FormField from "../FormField";
import { TokenABI, HIPtoken } from "../../helper/contract";
// import "../../styles/proposalstyle.css";

export default function Delegate(){

    // const [tokenAddr, setTokenAddr] = React.useState('');

    const [delegate, setDelegate] = React.useState('');
    // console.log("Inside Delegation Component", token)
    
    const { config } = usePrepareContractWrite({
        address: HIPtoken,
        abi: TokenABI,
        functionName: 'delegate',
        args: [delegate]
    })
    const {data, write} = useContractWrite(config)
    

    // useEffect(()=>{
    //     if(HIPtoken){
    //         setTokenAddr(HIPtoken)
    //     }
        
    // },[])


    async function HandleDelegation(){
        console.log("-->", HIPtoken, delegate)
       
        const delegation = write();
        console.log("AFTRE DELEGATION ATTEMPT:", delegation);
    }  
    return(
        <div className="formContainer" style={{borderWidth: 2, display: 'flex', flexDirection:'column',  justifyContent: "center", margin: 4, padding: 8}}>
            <form className="formInputs">
                <h4>Delegate Votes</h4>
                <p align="left" >Delegate votes to yourself or another address to initialise voting power.</p>
                {/* <FormField 
                    labelName="Token"
                    placeholder="address"
                    inputType="text"
                    value={tokenAddr}
                    handleChange={(e)=> setTokenAddr(e.target.value)}
                /> */}
                <FormField 
                    labelName="Delegate to"
                    placeholder="address"
                    inputType="text"
                    value={delegate}
                    handleChange={(e) => setDelegate(e.target.value)}
                />                
            </form>

            <button onClick={HandleDelegation} style={{borderWidth: 2, borderRadius: 16, paddingInline: 12, paddingBlock: 16}}>
                    Submit Transaction
            </button>
        </div>
    )
}