// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { prepareWriteContract } from "@wagmi/core";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { HIP_NFT, NFT_ABI } from "../helper/contract";
import { toETHdenomination } from "../helper/formatter";

function NFTPage() {
  const MINT_PRICE = '10000000000000000';

  async function buyNFT() {
    const config = await prepareWriteContract({
      address: HIP_NFT,
      abi: NFT_ABI,
      functionName: "mintNFT",
      value: MINT_PRICE,
    });
    console.log("Configuration",config);

    const { hash } = await writeContract(config);
    console.log("Propsoal Hash:", hash);
  }

  function mintNFT() {}

  return (
    <section>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-accent drop-shadow-sm py-10">
        NFTs
      </h1>
      <h3 className="pb-4 text-white">Mint Price: {toETHdenomination(MINT_PRICE)} FTM</h3>
      <div className="bg-accent mx-8 lg:mx-20 rounded-lg">
        <div className="relative bg-gradient-to-b from-transparent to-black w-full h-full flex items-center justify-center py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6">
            {[...Array(9).keys()].map((_, index) => {
              return (
                <div
                  key={index}
                  className="bg-black w-52 h-52 md:w-80 md:h-80 lg:w-52 lg:h-52 rounded-xl"
                >
                  0{index + 1}
                </div>
              );
            })}
          </div>
          <motion.div
            initial={{
              scale: 1,
              backgroundColor: "hsl(var(--primary))",
            }}
            whileHover={{
              scale: 1.3,
              backgroundColor: "hsl(var(--accent))",
            }}
            layout
            className="absolute bottom-32 rounded-md"
          >
            
              <Button
                className="text-2xl lg:text-4xl px-16 py-8 uppercase"
                variant="default"
                onClick={buyNFT}
              >
                Buy NFT
              </Button>

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default NFTPage;
