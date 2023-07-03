import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { fantom, fantomTestnet } from 'wagmi/chains';
import { Toaster } from '../src/components/ui/toaster';

const chains = [fantom, fantomTestnet];
const projectId = '0903962abc6c272e43c338b132b658c6';

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains, version: 2 }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    <Toaster />
  </React.StrictMode>
);
