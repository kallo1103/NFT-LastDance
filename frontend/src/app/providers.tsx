'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '3ee50caa36f61d90aa160bfbde09b830';

const metadata = {
  name: 'CryptoDash',
  description: 'Your all-in-one crypto dashboard',
  url: 'https://your-marketplace-url.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum] as const;

const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false })
  ],
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': 'rgb(147, 51, 234)',
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 