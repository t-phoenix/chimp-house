import ProposalList from '../components/ProposalList';
import StaticData from '../components/governor/StaticData';
import { Button } from '../components/ui/button';
import { HIPGovernor } from '../helper/contract';
import { Link } from 'react-router-dom';

function GovernorManager() {
  return (
    <div className='text-white'>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10'>
        DAO Manager
      </h1>
      <h3 className='pb-4'>
        Hipostel (HIP) Governor Contract:{' '}
        <span className='font-mono'>{HIPGovernor}</span>
      </h3>

      <Button asChild variant='default' className='font-medium mx-1 my-6'>
        <Link to='/create-proposal'>Create Proposal</Link>
      </Button>

      <div className='flex flex-col flex-wrap'>
        <StaticData />
        <ProposalList />

        {/* // <StaticData />
                // <Balance /> 
                // <Delegate />
                // <Transfer /> */}
        {/* <TransferOwner token={state} />
                <Delegate token={state} />
                <Balance token={state} /> */}
      </div>
    </div>
  );
}

export default GovernorManager;
