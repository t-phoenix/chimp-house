// @ts-nocheck
import { useState, useEffect } from 'react';
// import { proposals } from '../constants';
import { getProvider, readContract } from "@wagmi/core";
import { ethers } from 'ethers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SimpliGovernorABI } from '../ContractABIs/GovernorABI';
import { GovernorABI, HIPGovernor } from '../helper/contract';
// import '../styles/proposalstyle.css';


export default function ProposalList() {
    const provider = getProvider();
    // const { state } = useLocation();
    const navigate = useNavigate();
    // console.log("Propsal List DATA: ", daoData, "state", state);
    const daoContract = new ethers.Contract(HIPGovernor, GovernorABI, provider);


    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        fetchProposals()
    }, [])

    async function fetchProposals() {
        const proposalList = []
        const proposalCreatedFilter = daoContract.filters.ProposalCreated();
        const proposalCreatedEvent = await daoContract.queryFilter(proposalCreatedFilter);

        for (let index = 0; index < proposalCreatedEvent.length; index++) {
            const createEvent = proposalCreatedEvent[index];
            console.log("Proposal Create Event:", createEvent)
            const propState = await readContract({
                address: HIPGovernor,
                abi: GovernorABI,
                functionName: 'state',
                args: [String(createEvent.args.proposalId)]
            })
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
                callDatas: createEvent.args.calldatas
            })
        }
        console.log("Proposal List", proposalList)
        setProposals(proposalList);
    }


    // function handleProposalCard(proposal) {
    //     navigate(`/proposal-details/:${proposal.proposalId}`, { state: { ...state, proposal } })
    //     // navigate(`/dao-details/${dao.daoAddr}`,{state: dao} )
    // }

    return (
        <>
            {proposals == [] ? <div>No Proposals Detected</div> :
                <div className='proposal-list'>

                    {proposals.map((proposal) =>
                        <div key={proposal.key} className='proposal-card' >
                            <h4>Proposal Number: {proposal.key+1}</h4>
                            <p>Description: {proposal.description}</p>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'end'}}>
                                <div>
                                    {/* <p>Start: {proposal.votingStartDate}</p>
                                    <p>End: {proposal.votingEndDate}</p> */}
                                    <p>Status: {proposal.proposalState}</p>
                                    <p>Proposal Id: {proposal.proposalId}</p>
                                    <p>Proposer: {proposal.proposer}</p>

                                </div>

                                


                                <button style={{ marginLeft: '20px' }}>
                                    <Link to={`/proposal-details/:${proposal.proposalId}`} state={{proposal}}>Details</Link>
                                </button>
                            </div>
                        </div>
                    )}

                </div>}
        </>
    )
}