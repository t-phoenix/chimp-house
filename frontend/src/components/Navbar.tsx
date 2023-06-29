import { Link } from 'react-router-dom';
import { Web3Button } from '@web3modal/react';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between'>
      <Link to='/'>
        <div className='text-left text-base'>Chimp House</div>
        <div className='text-left text-xs font-extralight'>
          by Hipostel & Equilabs
        </div>
      </Link>

      <div>
        <Button asChild variant='ghost'>
          <Link to='/token-manager'>Token Manager</Link>
        </Button>
        <Button asChild variant='ghost'>
          <Link to='/governor-manager'>DAO Manager</Link>
        </Button>
      </div>

      <Web3Button />
    </div>
  );
}
