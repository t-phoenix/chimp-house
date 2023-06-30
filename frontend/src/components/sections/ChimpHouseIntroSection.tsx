import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

function ChimpHouseIntroSection() {
  const [typingAnimationTextColor, setTypingAnimationTextColor] = useState('');

  return (
    <section className='min-h-screen flex flex-row justify-center gap-x-3 content-center bg-accent'>
      <div className='text-9xl font-bold text-left w-1/2 place-self-center px-6'>
        What is Chimp House?
      </div>
      <div className='w-1/2 flex flex-col justify-center content-center'>
        <ul className='list-check-circle list-disc list-outside text-left'>
          <li> NFT Themed Space</li>
          <li> Co-working Zones</li>
          <li> NFT Themed Space</li>
          <li> Hub For Events</li>
          <li> In-house Cafe</li>
          <li> Exclusive Destinations</li>
        </ul>
      </div>
    </section>
  );
}

export default ChimpHouseIntroSection;
