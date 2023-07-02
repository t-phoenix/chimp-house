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
import CommonForm from './shared/CommonForm';
// import '../styles/proposalstyle.css';

export default function ProposalList() {
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
    const proposalList = [];
    const proposalCreatedFilter = daoContract.filters.ProposalCreated();
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
    setProposals(proposalList);
  }

  // function handleProposalCard(proposal) {
  //     navigate(`/proposal-details/:${proposal.proposalId}`, { state: { ...state, proposal } })
  //     // navigate(`/dao-details/${dao.daoAddr}`,{state: dao} )
  // }

  return (
    <>
      {proposals == [] ? (
        <div>No Proposals Detected</div>
      ) : (
        <>
          <CommonForm legendTitle='Your Proposals'>
            <Table className='bg-accent rounded'>
              <TableCaption className='text-white'>
                A list of your recent proposals.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Proposal Number</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Proposal ID</TableHead>
                  <TableHead>Proposer</TableHead>
                  <TableHead>Yay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.map((proposal) => (
                  <TableRow key={proposal.key}>
                    <TableCell className='font-medium'>
                      {proposal.key + 1}
                    </TableCell>
                    <TableCell>{proposal?.description}</TableCell>
                    <TableCell>{proposal?.proposalState}</TableCell>
                    <TableCell className='max-w-[6ch] truncate'>
                      {proposal?.proposalId}
                    </TableCell>
                    <TableCell className='max-w-[6ch] truncate'>
                      {proposal?.proposer}
                    </TableCell>
                    <TableCell>
                      <button>
                        <Link
                          to={`/proposal-details/:${proposal.proposalId}`}
                          state={{ proposal }}
                        >
                          Details
                        </Link>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CommonForm>
        </>
      )}
    </>
  );
}
