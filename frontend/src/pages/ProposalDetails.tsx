// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { ethers } from 'ethers';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useContractRead, useContractReads } from 'wagmi';
import { prepareWriteContract, readContract, writeContract } from '@wagmi/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// import { TokenABI } from "../ContractABIs/TokenABI";
// import { GovernorABI } from "../ContractABIs/GovernorABI";
import {
  HIPGovernor,
  HIPtoken,
  GovernorABI,
  TokenABI,
} from '../helper/contract';
import { toETHdenomination } from '../helper/formatter';
import CommonForm from '../components/shared/CommonForm';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../components/ui/hover-card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { toast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';

const VoteSchema = z.object({
  vote: z.union([z.literal('AGAINST'), z.literal('FOR'), z.literal('ABSTAIN')]),
});

const PROPOSAL_STATES = [
  {
    state: 0,
    status: 'Pending',
  },
  {
    state: 1,
    status: 'Active',
  },
  {
    state: 2,
    status: 'Cancelled',
  },
  {
    state: 3,
    status: 'Defeated',
  },
  {
    state: 4,
    status: 'Succeded',
  },
  {
    state: 6,
    status: 'Expired',
  },
  {
    state: 7,
    status: 'Executed',
  },
];

export default function ProposalDetails() {
  const { state } = useLocation();
  console.log('State of APP:', state);

  const tokenInterface = new ethers.utils.Interface(TokenABI);
  const decodeData = tokenInterface.decodeFunctionData(
    'transfer',
    state.proposal.callDatas[0]
  );
  console.log('Decoded Data:', decodeData);

  const governor = {
    address: HIPGovernor,
    abi: GovernorABI,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: HIPGovernor,
        abi: GovernorABI,
        functionName: 'proposalVotes',
        args: [state.proposal.proposalId],
      },
      {
        address: state.proposal.targets[0],
        abi: TokenABI,
        functionName: 'symbol',
      },
    ],
  });

  console.log('Proposal Votes:', data);
  const voteForm = useForm<z.infer<typeof VoteSchema>>({
    resolver: zodResolver(VoteSchema),
  });

  async function handleVote(votePref) {
    if (votePref == 0) {
      console.log('Vote FOR Proposal');
      const config = await prepareWriteContract({
        ...governor,
        functionName: 'castVote',
        args: [state.proposal.proposalId, 0],
      });

      const data = await writeContract(config);
      console.log('After Granting Role:', data);
    } else if (votePref == 1) {
      console.log('Vote against proposal');
      const config = await prepareWriteContract({
        ...governor,
        functionName: 'castVote',
        args: [state.proposal.proposalId, 1],
      });

      const data = await writeContract(config);
      console.log('After Granting Role:', data);
    } else if (votePref == 2) {
      console.log('Vote abstain proposal');
      const config = await prepareWriteContract({
        ...governor,
        functionName: 'castVote',
        args: [state.proposal.proposalId, 1],
      });

      const data = await writeContract(config);
      console.log('After Granting Role:', data);
    }
  }

  function onVoteSubmit(data: z.infer<typeof VoteSchema>) {
    console.log(data);

    switch (data.vote) {
      case 'AGAINST':
        handleVote(0);
        break;
      case 'FOR':
        handleVote(1);
        break;
      case 'ABSTAIN':
        handleVote(2);
        break;
    }

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  //   async function queueProposal() {
  //     const descriptionHash = ethers.utils.id(state.proposal.description);
  //     console.log("PROP QUEUE:", state.proposal.description, descriptionHash);

  //     const config = await prepareWriteContract({
  //       ...governor,
  //       functionName: "queue",
  //       args: [
  //         state.proposal.targets,
  //         state.proposal.values,
  //         state.proposal.callDatas,
  //         descriptionHash,
  //       ],
  //     });

  //     const data = await writeContract(config);
  //     console.log("After Queuing Proposal:", data);
  //   }

  async function executeProposal() {
    const descriptionHash = ethers.utils.id(state.proposal.description);
    const config = await prepareWriteContract({
      ...governor,
      functionName: 'execute',
      args: [
        state.proposal.targets,
        state.proposal.values,
        state.proposal.callDatas,
        descriptionHash,
      ],
    });

    const data = await writeContract(config);
    console.log('After Executing Proposal:', data);
  }

  return (
    <section className='flex flex-col text-white'>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10'>
        DAO Manager
      </h1>
      <h3 className='pb-4'>Description</h3>

      <CommonForm legendTitle='Proposal Details'>
        <div className='overflow-scroll flex flex-col flex-wrap flex-grow justify-between gap-4 lg:gap-8'>
          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Proposal Id
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.proposalId}
            </div>
          </div>

          <div className='flex flex-col justify-start items-start'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Description
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.description}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Proposal State
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.proposalState}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Governor Contract
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {HIPGovernor}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Proposer's Address
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.proposer}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Transaction Hash
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.transactionHash}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Voting Start (block)
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.votingStartDate}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Voting End (block)
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {state.proposal.votingEndDate}
            </div>
          </div>

          {data ? (
            <div className='flex flex-wrap flex-row space-x-4'>
              <div className='flex flex-col'>
                <div className='text-left text-sm uppercase font-medium text-gray-200'>
                  Votes For
                </div>
                <div className='text-left text-2xl font-bold text-gray-50'>
                  {toETHdenomination(Number(data[0].forVotes))}
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='text-left text-sm uppercase font-medium text-gray-200'>
                  Votes Against
                </div>
                <div className='text-left text-2xl font-bold text-gray-50'>
                  {toETHdenomination(Number(data[0].againstVotes))}
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='text-left text-sm uppercase font-medium text-gray-200'>
                  Votes Abstain
                </div>
                <div className='text-left text-2xl font-bold text-gray-50'>
                  {toETHdenomination(Number(data[0].abstainVotes))}
                </div>
              </div>
            </div>
          ) : null}

          <div className='flex flex-col'>
            <div className='text-left text-sm uppercase font-medium text-gray-200'>
              Amount Receiver
            </div>
            <div className='text-left text-2xl font-bold text-gray-50'>
              {decodeData.to}
            </div>
            d
          </div>

          {data ? (
            <div className='flex flex-col'>
              <div className='text-left text-sm uppercase font-medium text-gray-200'>
                Amount
              </div>
              <div className='text-left text-2xl font-bold text-gray-50'>
                {Number(decodeData.amount)} {data[1]}
              </div>
            </div>
          ) : null}
        </div>
      </CommonForm>

      {state.proposal.proposalState == 1 ? (
        <Form {...voteForm}>
          <form
            onSubmit={voteForm.handleSubmit(onVoteSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={voteForm.control}
              name='vote'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vote</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your vote' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='AGAINST'>Against</SelectItem>
                      <SelectItem value='FOR'>For</SelectItem>
                      <SelectItem value='ABSTAIN'>Abstain</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Check your voting power on token Screen before voting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Vote</Button>
          </form>
        </Form>
      ) : null}

      {state.proposal.proposalState == 2 ? (
        <div>
          <h3>Proposal Cancelled</h3>
        </div>
      ) : null}

      {state.proposal.proposalState == 3 ? (
        <div>
          <h3>Proposal Defeated</h3>
        </div>
      ) : null}

      {state.proposal.proposalState == 4 ? (
        <div>
          <p>Proposal Succeded</p>
          <Button className='m-8' onClick={executeProposal}>
            Execute
          </Button>
        </div>
      ) : null}

      {state.proposal.proposalState == 6 ? (
        <div>
          <p>Proposal Expired</p>
        </div>
      ) : null}

      {state.proposal.proposalState == 7 ? (
        <div>
          <h3>Proposal Executed</h3>
        </div>
      ) : null}

      <CommonForm legendTitle='Proposal State Mapping'>
        <Table>
          <TableCaption>A mapping of proposal states.</TableCaption>
          <TableHeader>
            <TableRow className='text-left'>
              <TableHead>Proposal State</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-left'>
            {PROPOSAL_STATES.map((proposalState, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{proposalState.state}</TableCell>
                  <TableCell>{proposalState.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CommonForm>
    </section>
  );
}
