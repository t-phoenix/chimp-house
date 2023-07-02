// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { readContracts } from '@wagmi/core';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { HIPtoken, TokenABI } from '../../helper/contract';
// import "../../styles/proposalstyle.css";
// import FormField from "../FormField";
import { toETHdenomination } from '../../helper/formatter';
import { Button } from '../../components/ui/button';

export default function StaticData() {
  // const [tokenAddr, setTokenAddr] = React.useState();
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    fetchTokenData();
  }, []);

  async function fetchTokenData() {
    // const tokenContract = {
    //     address: HIPtoken,
    //     abi: TokenABI
    // }
    console.log('Fetching data ....');
    const tokenData = await readContracts({
      contracts: [
        {
          address: HIPtoken,
          abi: TokenABI,
          functionName: 'name',
        },
        {
          address: HIPtoken,
          abi: TokenABI,
          functionName: 'symbol',
        },
        {
          address: HIPtoken,
          abi: TokenABI,
          functionName: 'owner',
        },
        {
          address: HIPtoken,
          abi: TokenABI,
          functionName: 'totalSupply',
        },
        {
          address: HIPtoken,
          abi: TokenABI,
          functionName: 'decimals',
        },
      ],
    });
    console.log('Token Data:', tokenData);
    setResult(tokenData);
  }

  return (
    <form>
      <fieldset className='bg-accent rounded p-8 m-4 lg:m-20'>
        <legend className='bg-secondary px-4 py-2 rounded uppercase font-bold text-2xl border-white border'>
          Token Data
        </legend>

        {result ? (
          <div className='flex flex-row flex-wrap flex-grow justify-between gap-4 lg:gap-8'>
            <div className='flex flex-col'>
              <div className='text-left text-sm uppercase font-medium text-gray-200'>
                Name
              </div>
              <div className='text-left text-2xl font-bold text-gray-50'>
                {result[0] || 'Ayush Gupta'}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-left text-sm uppercase font-medium text-gray-200'>
                Symbol
              </div>
              <div className='text-left text-2xl font-bold text-gray-50'>
                {result[1] || 'HIP'}{' '}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-left text-sm uppercase font-medium text-gray-200'>
                Supply
              </div>
              <div className='text-left text-2xl font-bold text-gray-50'>
                {toETHdenomination(Number(result[3]))}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-left text-sm uppercase font-medium text-gray-200'>
                Decimals
              </div>
              <div className='text-left text-2xl font-bold text-gray-50'>
                {result[4] || '0133213'}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-left text-sm uppercase font-medium text-gray-200'>
                Onwer
              </div>
              <div className='text-left text-2xl font-bold text-gray-50'>
                {result[2] || 'Abhinil'}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Alert variant='destructive'>
              <ExclamationTriangleIcon className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your data couldn't be fetched, try again.
              </AlertDescription>
            </Alert>
            <Button onClick={fetchTokenData} className='mt-4' variant='outline'>
              Re-fetch Data
            </Button>
          </>
        )}
      </fieldset>
    </form>
  );
}
