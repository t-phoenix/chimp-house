// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { prepareWriteContract } from '@wagmi/core';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { HIP_NFT, NFT_ABI } from '../helper/contract';
import nft1 from '../assets/edition hipostel/images/1.png';
import nft2 from '../assets/edition hipostel/images/2.png';
import nft3 from '../assets/edition hipostel/images/3.png';
import nft4 from '../assets/edition hipostel/images/4.png';
import nft5 from '../assets/edition hipostel/images/5.png';
import nft6 from '../assets/edition hipostel/images/6.png';
import nft7 from '../assets/edition hipostel/images/7.png';
import nft8 from '../assets/edition hipostel/images/8.png';
import nft9 from '../assets/edition hipostel/images/9.png';
import nft10 from '../assets/edition hipostel/images/10.png';
import nft11 from '../assets/edition hipostel/images/11.png';
import { toETHdenomination } from '../helper/formatter';

const NFT_ASSETS_URL = [
  nft1,
  nft2,
  nft3,
  nft4,
  nft5,
  nft6,
  nft7,
  nft8,
  nft9,
  nft10,
  nft11,
];

function NFTPage() {
  const MINT_PRICE = '0.1' ;

  const [result, setResult] = React.useState('');

  // async function buyNFT() {
  //   const config = await prepareWriteContract({
  //     address: HIP_NFT,
  //     abi: NFT_ABI,
  //     functionName: "mintNFT",
  //     // value: ethers.utils.parseEther('0.1'),
  //   });
  //   console.log('Configuration', config);

  //   const { hash } = await writeContract(config);
  //   console.log('Propsoal Hash:', hash);
  // }

  async function mintNFT() {
    const config = await prepareWriteContract({
      address: HIP_NFT,
      abi: NFT_ABI,
      functionName: "mintFREENFT",
    });
    console.log("Configuration",config);

    const { hash } = await writeContract(config);
    console.log("Propsoal Hash:", hash);
    setResult(hash);

  }

  return (
    <section>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10'>
        NFTs
      </h1>
      <h3 className="pb-4 text-white">NFT Contract: FREE</h3>

      <h3 className="pb-4 text-white">Mint Price: {MINT_PRICE} FTM</h3>
      <div className="bg-accent mx-8 lg:mx-20 rounded-lg">
        <div className="relative bg-gradient-to-b from-transparent to-black w-full h-full flex items-center justify-center py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6">
            {[...Array(9).keys()].map((_, index) => {
              return (
                <img
                  key={index}
                  className='bg-black bg-origin-border bg-center bg-cover w-52 h-auto md:w-80 lg:w-52 rounded-xl'
                  src={NFT_ASSETS_URL[index]}
                />
              );
            })}
          </div>
          <motion.div
            initial={{
              scale: 1,
              backgroundColor: 'hsl(var(--primary))',
            }}
            whileHover={{
              scale: 1.3,
              backgroundColor: 'hsl(var(--accent))',
            }}
            layout
            className='absolute bottom-32 rounded-md'
          >
            
              {/* <Button
                className="text-2xl lg:text-4xl px-16 py-8 uppercase"
                variant="default"
                onClick={buyNFT}
              >
                Buy NFT
              </Button> */}
              <Button
                className="text-2xl lg:text-4xl px-16 py-8 uppercase"
                variant="default"
                onClick={mintNFT}
              >
                MINT FREE NFT
              </Button>
              {
                result ?
                <>
                  <p>Tansaction Hash: {result}</p>
                </>
                : <></>
              }


            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default NFTPage;
