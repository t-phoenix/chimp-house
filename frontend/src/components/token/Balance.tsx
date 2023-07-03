// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { HIPtoken, TokenABI } from '../../helper/contract';
// import "../../styles/proposalstyle.css";
import { readContract } from '@wagmi/core';
import { toETHdenomination } from '../../helper/formatter';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CommonCard from '../shared/CommonCard';
import { useToast } from '../ui/use-toast';

export default function Balance() {
  // const [tokenAddr, setTokenAddr] = React.useState();
  const [userAddr, setUserAddr] = useState('');
  const [result, setResult] = useState('');
  const [votes, setVotes] = useState('');
  // console.log("Inside Delegation Component", token)
  const toast = useToast();

  useEffect(() => {
    // if (token) {
    //     setTokenAddr(token.tokenAddr);
    // }
  }, []);

  async function handleGetBalance() {
    console.log('-->', HIPtoken, userAddr);

    const data = await readContract({
      address: HIPtoken,
      abi: TokenABI,
      functionName: 'balanceOf',
      args: [userAddr],
    });

    console.log(
      'AFTRE Balance ATTEMPT:',
      data,
      toETHdenomination(Number(data))
    );
    setResult(toETHdenomination(Number(data)));
  }

  async function handleGetVotes() {
    console.log('-->', HIPtoken, userAddr);

    const data = await readContract({
      address: HIPtoken,
      abi: TokenABI,
      functionName: 'getVotes',
      args: [userAddr],
    });
    console.log(
      'Fetch Voting Power ATTEMPT:',
      data,
      toETHdenomination(Number(data))
    );
    setVotes(Number(toETHdenomination(data)));
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <CommonCard legendTitle='Balance or Votes of Users'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label
          htmlFor='userAddress'
          className='flex items-start text-left text-sm uppercase font-medium text-gray-200'
        >
          User Address
        </Label>
        <Input
          type='text'
          placeholder='0xabcd'
          onChange={(e) => setUserAddr(e.target.value)}
          value={userAddr}
          className='bg-white text-black'
          required
        />
      </div>

      <div className='flex flex-row space-x-6 mt-8'>
        <Button variant='outline' onClick={handleGetBalance}>
          Get Balance
        </Button>
        <Button variant='outline' onClick={handleGetVotes}>
          Get Votes
        </Button>
      </div>

      {result !== '' ? (
        <div className='text-left font-bold pt-4'>Balance: {result}</div>
      ) : null}

      {votes !== '' ? (
        <div className='text-left font-bold pt-4'>Votes: {votes}</div>
      ) : null}
    </CommonCard>
  );
}
