// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nxocheck

import React from 'react';

import ProposalForm from '../components/forms/ProposalForm';
import AdvProposalForm from '../components/forms/AdvProposalForm';


export default function CreateProposal() {
  // const {state} = useLocation();

  React.useEffect(() => {
    console.log('NEW USE EFFECT 1 ');

    return () => {
      console.log('NEW USE EFFECT 2');
    };
  }, []);

  return (
    <>
      <div className='trxn-container text-yellow-600'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10'>
          Create Proposal
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* <h2>{state.daoName}</h2> */}
          {/* <p>Address: <a href={getLinkedAddress(state.daoAddr)} target="blank" style={{ fontSize: '14px' }}>{state.daoAddr}</a></p> */}
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          <ProposalForm />
          <AdvProposalForm />
        </div>
      </div>
    </>
  );
}
