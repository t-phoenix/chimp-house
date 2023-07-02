// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import FormField from '../FormField';
import { TokenABI, HIPtoken } from '../../helper/contract';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CommonForm from '../shared/CommonForm';
// import "../../styles/proposalstyle.css";

export default function Delegate() {
  // const [tokenAddr, setTokenAddr] = React.useState('');

  const [delegate, setDelegate] = React.useState('');
  // console.log("Inside Delegation Component", token)

  const { config } = usePrepareContractWrite({
    address: HIPtoken,
    abi: TokenABI,
    functionName: 'delegate',
    args: [delegate],
  });
  const { data, write } = useContractWrite(config);

  // useEffect(()=>{
  //     if(HIPtoken){
  //         setTokenAddr(HIPtoken)
  //     }

  // },[])

  async function HandleDelegation() {
    console.log('-->', HIPtoken, delegate);

    const delegation = write();
    console.log('AFTRE DELEGATION ATTEMPT:', delegation);
  }
  return (
    <CommonForm
      legendTitle='Delegate Votes'
      formDescription='Delegate votes to yourself or another address to initialise voting
    power.'
    >
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label
          htmlFor='userAddress'
          className='flex items-start text-left text-sm uppercase font-medium text-gray-200'
        >
          Delegate To
        </Label>
        <Input
          type='text'
          placeholder='0xabcd'
          onChange={(e) => setDelegate(e.target.value)}
          value={delegate}
          className='bg-white text-black'
          required
        />
      </div>

      <div className='flex flex-row space-x-6 mt-8'>
        <Button variant='outline' onClick={HandleDelegation}>
          Delegate
        </Button>
      </div>
    </CommonForm>
  );
}
