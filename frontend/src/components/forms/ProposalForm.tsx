// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { SimpliFactoryABI } from '../../ContractABIs/FactoryABI';
import FormField from '../FormField';
// import '../../styles/proposalstyle.css';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useProvider,
} from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import { Factory1_Addr } from '../../constants/ContractAddress';
import { useLocation, useNavigate } from 'react-router-dom';
// import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import { ethers } from 'ethers';
// import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import {
  HIPGovernor,
  HIPtoken,
  TokenABI,
  GovernorABI,
} from '../../helper/contract';
import { getLinkedAddress, toWeiDenomination } from '../../helper/formatter';
import CommonCard from '../shared/CommonCard';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function ProposalForm() {
  // const { state }= useLocation()
  // const DAOdata = state?.data;
  // console.log("MY Location DATA:", state.daoAddr, DAOdata);
  const provider = useProvider();
  const account = useAccount();
  console.log('Check Connected Account:', account.address);

  const [proposalForm, setProposalForm] = useState({
    token: '',
    sendTo: '',
    amount: '',
    description: '',
  });

  const token = new ethers.Contract(HIPtoken, TokenABI, provider);

  useEffect(() => {
    setProposalForm({ ...proposalForm, token: HIPtoken });
  }, []);

  async function handleCreateProposalClick() {
    console.log('USER INPUTS:', proposalForm);
    const calldata = token.interface.encodeFunctionData('transfer', [
      proposalForm.sendTo,
      String(toWeiDenomination(Number(proposalForm.amount))),
    ]);

    const config = await prepareWriteContract({
      address: HIPGovernor,
      abi: GovernorABI,
      functionName: 'propose',
      args: [[HIPtoken], [0], [calldata], proposalForm.description],
    });

    const { hash } = await writeContract(config);
    console.log('Propsoal Hash:', hash);
  }

  const handleFormFieldChange = (fieldName, e) => {
    setProposalForm({ ...proposalForm, [fieldName]: e.target.value });
  };

  return (
    <>
      {/* <h2>DAO Address: {state.daoAddr}</h2> */}
      <CommonCard
        legendTitle='DAO Token Expense Form'
        formDescription='Make sure you have enough delegated voting power to create proposal.
          Use Token Screen to delegate votes based on token balance.'
      >
        <div className='grid grid-cols-2 w-full max-w-sm items-center gap-1.5'>
          <Label className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
            ERC20 Token
          </Label>
          <Input
            type='text'
            placeholder='Address'
            onChange={(e) => handleFormFieldChange('token', e)}
            value={proposalForm.token}
            className='bg-white text-black font-mono'
            required
            readOnly={proposalForm.token !== ''}
          />

          <Label className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
            Receiver
          </Label>
          <Input
            type='text'
            placeholder='0xabcd'
            onChange={(e) => handleFormFieldChange('sendTo', e)}
            value={proposalForm.sendTo}
            className='bg-white text-black font-mono'
            required
          />

          <Label className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
            Amount
          </Label>
          <Input
            type='number'
            placeholder='in ETH Domination'
            onChange={(e) => handleFormFieldChange('amount', e)}
            value={proposalForm.amount}
            className='bg-white text-black'
            required
          />

          <Label className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
            Description
          </Label>
          <Textarea
            placeholder='Write description of proposal'
            value={proposalForm.description}
            onChange={(e) => handleFormFieldChange('description', e)}
            className='bg-white text-black'
            required
          />
        </div>

        <div className='flex flex-row space-x-6 mt-8'>
          <Button variant='outline' onClick={handleCreateProposalClick}>
            Create Proposal
          </Button>
        </div>
      </CommonCard>
    </>
  );
}
