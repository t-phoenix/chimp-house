import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { TokenABI, HIPtoken } from '../../helper/contract';
import { toWeiDenomination } from '../../helper/formatter';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CommonForm from '../shared/CommonForm';

export default function Transfer() {
  const [sendTo, setSendTo] = useState('');
  const [amount, setAmount] = useState(0);

  const { config } = usePrepareContractWrite({
    address: HIPtoken,
    abi: TokenABI,
    functionName: 'transfer',
    args: [sendTo, String(toWeiDenomination(amount))],
  });
  const { write } = useContractWrite(config);

  function HandleTransfer() {
    console.log('-->', HIPtoken, sendTo, ': ', toWeiDenomination(amount));

    const transfer = write?.();
    console.log('AFTRE TRANSFER ATTEMPT:', transfer);
  }

  return (
    <CommonForm legendTitle='Transfer Tokens'>
      <div className='grid grid-cols-2 w-full max-w-sm items-center gap-1.5'>
        <Label className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
          Send To
        </Label>
        <Input
          type='text'
          placeholder='0xabcd'
          onChange={(e) => setSendTo(e.target.value)}
          value={sendTo}
          className='bg-white text-black'
          required
        />

        <Label className='flex items-start text-left text-sm uppercase font-medium text-gray-200'>
          Amount
        </Label>
        <Input
          type='number'
          placeholder='0xabcd'
          onChange={(e) => setAmount(parseInt(e.target.value))}
          value={amount}
          className='bg-white text-black'
          required
        />
      </div>

      <div className='flex flex-row space-x-6 mt-8'>
        <Button variant='outline' onClick={HandleTransfer}>
          Transfer
        </Button>
      </div>
    </CommonForm>
  );
}
