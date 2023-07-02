import StaticData from '../components/token/StaticData';
// import Delegate from "../components/token/Delegate";
import Balance from '../components/token/Balance';
import Delegate from '../components/token/Delegate';
import { HIPtoken } from '../helper/contract';
import Transfer from '../components/token/Transfer';

// import TransferOwner from "../components/token/TransferOwner";

function TokenManager() {
  return (
    <div className='text-white'>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10'>
        Token Manager
      </h1>
      <h3 className='pb-4'>
        Hipostel (HIP) Token Contract:{' '}
        <span className='font-mono'>{HIPtoken}</span>
      </h3>
      <div className='flex flex-col flex-wrap'>
        <StaticData />
        <Balance />
        <Delegate />
        <Transfer />
        {/* <TransferOwner token={state} />
                <Delegate token={state} />
                <Balance token={state} /> */}
      </div>
    </div>
  );
}

export default TokenManager;
