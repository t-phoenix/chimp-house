// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from 'react';
// import { proposals } from '../constants';
import { getProvider, readContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SimpliGovernorABI } from '../ContractABIs/GovernorABI';
import { GovernorABI, HIPGovernor } from '../helper/contract';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import CommonCard from './shared/CommonCard';
import { Button } from './ui/button';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
// import '../styles/proposalstyle.css';

export default function ProposalList() {
  const [proposalsRequestState, setProposalsRequestState] = useState<
    'idle' | 'rejected' | 'resolved' | 'pending'
  >('idle');
  const provider = getProvider();
  // const { state } = useLocation();
  const navigate = useNavigate();
  // console.log("Propsal List DATA: ", daoData, "state", state);
  const daoContract = new ethers.Contract(HIPGovernor, GovernorABI, provider);

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  async function fetchProposals() {
    setProposalsRequestState('pending');
    const proposalList = [];
    const proposalCreatedFilter = daoContract.filters.ProposalCreated();

    try {
      const proposalCreatedEvent = await daoContract.queryFilter(
        proposalCreatedFilter
      );

      for (let index = 0; index < proposalCreatedEvent.length; index++) {
        const createEvent = proposalCreatedEvent[index];
        console.log('Proposal Create Event:', createEvent);
        const propState = await readContract({
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'state',
          args: [String(createEvent.args.proposalId)],
        });
        // console.log("Proposal STATE:", propState)
        proposalList.push({
          key: index,
          proposalId: String(createEvent.args.proposalId),
          header: createEvent.blockHash,
          transactionHash: createEvent.transactionHash,
          description: createEvent.args.description,
          proposer: createEvent.args.proposer,
          votingStartDate: Number(createEvent.args.votingStartDate),
          votingEndDate: Number(createEvent.args.votingEndDate),
          proposalState: propState,
          targets: createEvent.args.targets,
          values: createEvent.args[3],
          callDatas: createEvent.args.calldatas,
        });
      }
      console.log('Proposal List', proposalList);
      setProposalsRequestState('resolved');
      setProposals(proposalList);
    } catch (err) {
      console.error(err);
      setProposalsRequestState('rejected');
    }
  }

  // function handleProposalCard(proposal) {
  //     navigate(`/proposal-details/:${proposal.proposalId}`, { state: { ...state, proposal } })
  //     // navigate(`/dao-details/${dao.daoAddr}`,{state: dao} )
  // }

  return (
    <CommonCard legendTitle='Your Proposals'>
      {['idle', 'pending'].includes(proposalsRequestState) ? (
        <div>Loading your proposals...</div>
      ) : null}

      {proposalsRequestState === 'resolved' ? (
        <Table className='bg-accent rounded'>
          <TableCaption className='text-white'>
            A list of your recent proposals.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Proposal Number</TableHead>
              <TableHead className='text-center'>Description</TableHead>
              <TableHead className='text-center'>Status</TableHead>
              <TableHead className='text-center'>Proposal ID</TableHead>
              <TableHead className='text-center'>Proposer</TableHead>
              <TableHead className='text-center'>Yay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.key}>
                <TableCell className='font-medium text-center'>
                  {proposal.key + 1}
                </TableCell>
                <TableCell className='text-left max-w-[6ch] truncate'>
                  {proposal?.description}
                </TableCell>
                <TableCell>{proposal?.proposalState}</TableCell>
                <TableCell className='max-w-[6ch] truncate'>
                  {proposal?.proposalId}
                </TableCell>
                <TableCell className='max-w-[6ch] truncate'>
                  {proposal?.proposer}
                </TableCell>
                <TableCell>
                  <Button asChild variant='link'>
                    <Link
                      to={`/proposal-details/:${proposal.proposalId}`}
                      state={{ proposal }}
                    >
                      Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}

      {proposalsRequestState === 'rejected' ? (
        <Alert variant='destructive'>
          <ExclamationTriangleIcon className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your data couldn't be fetched, try again.
          </AlertDescription>
        </Alert>
      ) : null}
    </CommonCard>
  );
}
