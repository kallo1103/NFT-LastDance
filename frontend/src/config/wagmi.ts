import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { 
  mainnet, 
  arbitrum, 
  optimism, 
  polygon, 
  bsc, 
  avalanche,
  base
} from 'viem/chains';

let config: any;

// Ensure this code only runs on the client side
if (typeof window !== 'undefined') {
  try {
    // Get projectId from environment variable
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

    if (!projectId) {
      throw new Error('WalletConnect project ID is required. Please check your environment variables.');
    }

    const metadata = {
      name: 'NFT Marketplace',
      description: 'A decentralized marketplace for NFTs',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    };

    // Define supported chains
    const chains = [
      mainnet,
      polygon,
      optimism,
      arbitrum,
      bsc,
      avalanche,
      base
    ] as const;

    config = defaultWagmiConfig({
      chains,
      projectId,
      metadata,
      ssr: false
    });

    // Create web3modal instance with enhanced configuration
    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#3b82f6', // Tailwind blue-500
        '--w3m-border-radius-master': '0.75rem'
      },
      chainImages: {
        [mainnet.id]: 'https://ethereum.org/static/eth-diamond-rainbow.png',
        [polygon.id]: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
        [optimism.id]: 'https://optimism.io/images/logos/optimism-logo.svg',
        [arbitrum.id]: 'https://arbitrum.io/assets/logo.svg',
        [bsc.id]: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
        [avalanche.id]: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
        [base.id]: 'https://base.org/logo.svg'
      },
      tokens: {
        [mainnet.id]: {
          address: '0x0000000000000000000000000000000000000000',
          image: 'https://ethereum.org/static/eth-diamond-rainbow.png'
        },
        [polygon.id]: {
          address: '0x0000000000000000000000000000000000001010',
          image: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
        }
      }
    });

  } catch (error) {
    console.error('Failed to initialize Web3Modal:', error);
    config = {};
  }
} else {
  config = {};
}

export { config }; 