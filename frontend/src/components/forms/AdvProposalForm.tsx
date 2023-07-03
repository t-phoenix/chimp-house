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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { SimpliGovernorABI } from "../../ContractABIs/GovernorABI";
import {
  HIPGovernor,
  GovernorABI,
  TokenABI,
  HIPtoken,
} from '../../helper/contract';
import { ethers } from 'ethers';
// import { ERC20TokenABI } from "../../ContractABIs/ERC20TokenABI";
import { getLinkedAddress } from '../../helper/formatter';
import CommonForm from '../shared/CommonForm';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  targetContract: z.array(z.string()),
  valuesToSend: z.array(z.string()),
  callDatas: z.array(z.string()),
  description: z.string(),
});

export default function AdvProposalForm() {
  const { state } = useLocation();
  // const DAOdata = state?.data;
  // console.log("MY Location DATA:", state.daoAddr, DAOdata);
  const provider = useProvider();
  const account = useAccount();
  console.log('Check Connected Account:', account.address);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  async function handleCreateProposalClick(data: z.infer<typeof formSchema>) {
    // const calldata = token.interface.encodeFunctionData('transfer', [proposalForm.target, proposalForm.value]);
    // console.log("USER INPUTS:", calldata);
    const config = await prepareWriteContract({
      address: HIPGovernor,
      abi: GovernorABI,
      functionName: 'propose',
      args: [
        data.targetContract,
        data.valuesToSend,
        data.callDatas,
        data.description,
      ],
    });

    const { hash } = await writeContract(config);
    console.log('Propsoal Hash:', hash);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    handleCreateProposalClick(data);
  }

  const [proposalForm, setProposalForm] = useState({
    target: '',
    value: '',
    calldata: '',
    description: '',
  });

  const token = new ethers.Contract(HIPtoken, TokenABI, provider);

  return (
    <CommonForm
      legendTitle='Advance Proposal Form'
      formDescription='Make sure you have enough delegated voting power to create proposal.
          Use Token Screen to delegate votes based on token balance.'
      onFormSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className='space-y-6'>
          <UIFormField
            control={form.control}
            name='targetContract'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
                  Target Contract
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-white text-black'
                    placeholder='address[]'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='text-left'>
                  Example: ["0x1158EE5AC602F9517C8D9C02b5b67B70DD991E66",
                  "0x6C57346BF8255Ea8EA44F001693Ce444A22b17ad"]
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <UIFormField
            control={form.control}
            name='valuesToSend'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
                  Values to Send
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-white text-black'
                    placeholder='amount[]'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='text-left'>
                  Example: [0, 450000] in wei
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <UIFormField
            control={form.control}
            name='callDatas'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
                  Calldatas
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-white text-black'
                    placeholder='Encode Function Call'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='text-left'>
                  Example: ["0xa9059cbb0000000....000000000000000",
                  "0xb40f9cbb000.....000000000000000"]
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <UIFormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-white text-black'
                    placeholder='Write description of proposal'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription className='text-left'>
                  Example: ["0xa9059cbb0000000....000000000000000",
                  "0xb40f9cbb000.....000000000000000"]
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-row space-x-6 mt-8'>
          <Button variant='outline' type='submit'>
            Create Proposal
          </Button>
        </div>
      </Form>
    </CommonForm>
  );
}
