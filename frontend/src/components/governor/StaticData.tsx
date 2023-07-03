// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { readContracts } from '@wagmi/core';
import { HIPGovernor, GovernorABI } from '../../helper/contract';
// import "../../styles/proposalstyle.css";
// import FormField from "../FormField";
import { toETHdenomination } from '../../helper/formatter';
import CommonForm from '../shared/CommonForm';

export default function StaticData() {
  // const [tokenAddr, setTokenAddr] = React.useState();
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    fetchTokenData();
  }, []);

  async function fetchTokenData() {
    console.log('Fetching data ....');
    const tokenData = await readContracts({
      contracts: [
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'name',
        },
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'token',
        },
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'votingDelay',
        },
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'votingPeriod',
        },
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'quorumNumerator',
        },
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'quorumDenominator',
        },
        {
          address: HIPGovernor,
          abi: GovernorABI,
          functionName: 'proposalThreshold',
        },
      ],
    });
    console.log('Token Data:', tokenData);
    setResult(tokenData);
  }

  return (
    <CommonForm
      legendTitle='DAO Data'
      onErrorCTA='Re-fetch Data'
      onErrorCTAClick={fetchTokenData}
    >
      <div className='flex flex-row flex-wrap flex-grow justify-between gap-4 lg:gap-8'>
        <div className='flex flex-col'>
          <div className='text-left text-sm uppercase font-medium text-gray-200'>
            Name
          </div>
          <div className='text-left text-2xl font-bold text-gray-50'>
            {result[0] || '-'}
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-left text-sm uppercase font-medium text-gray-200'>
            Token
          </div>
          <div className='text-left text-2xl font-bold text-gray-50 font-mono'>
            {result[1] || '-'}
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-left text-sm uppercase font-medium text-gray-200'>
            Proposal Threshold
          </div>
          <div className='text-left text-2xl font-bold text-gray-50'>
            {toETHdenomination(Number(result[6])) || '-'}
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-left text-sm uppercase font-medium text-gray-200'>
            Voting Delay
          </div>
          <div className='text-left text-2xl font-bold text-gray-50'>
            {Number(result[2]) || '-'}
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-left text-sm uppercase font-medium text-gray-200'>
            Voting Period
          </div>
          <div className='text-left text-2xl font-bold text-gray-50'>
            {Number(result[3]) || '-'}
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-left text-sm uppercase font-medium text-gray-200'>
            Quorum:
          </div>
          <div className='text-left text-2xl font-bold text-gray-50'>
            {Number(result[4]) && Number(result[5])
              ? `${Number(result[4]) / Number(result[5])}`
              : '-'}
          </div>
        </div>
      </div>
    </CommonForm>
  );
}
