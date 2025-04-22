import { useChainId, useChains, useSwitchChain } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, bsc, avalanche, base, Chain } from 'viem/chains';

interface ExtendedChain extends Chain {
  icon: string;
}

type SupportedNetworks = {
  [key: number]: ExtendedChain;
};

export const SUPPORTED_NETWORKS: SupportedNetworks = {
  [mainnet.id]: {
    ...mainnet,
    name: 'Ethereum',
    icon: 'https://ethereum.org/static/eth-diamond-rainbow.png'
  },
  [polygon.id]: {
    ...polygon,
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
  },
  [optimism.id]: {
    ...optimism,
    icon: 'https://optimism.io/images/logos/optimism-logo.svg'
  },
  [arbitrum.id]: {
    ...arbitrum,
    icon: 'https://arbitrum.io/assets/logo.svg'
  },
  [bsc.id]: {
    ...bsc,
    name: 'BNB Smart Chain',
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  },
  [avalanche.id]: {
    ...avalanche,
    icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png'
  },
  [base.id]: {
    ...base,
    icon: 'https://base.org/logo.svg'
  }
};

export const DEFAULT_CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || mainnet.id);

export function useNetwork() {
  const chainId = useChainId();
  const chains = useChains();
  const { switchChain, isPending, variables } = useSwitchChain();

  const currentNetwork = chainId ? SUPPORTED_NETWORKS[chainId] : null;
  const isTestnet = currentNetwork?.testnet ?? false;
  const isSupported = chainId ? chainId in SUPPORTED_NETWORKS : false;

  const switchToDefaultNetwork = () => {
    if (switchChain && DEFAULT_CHAIN_ID) {
      switchChain({ chainId: DEFAULT_CHAIN_ID });
    }
  };

  return {
    chainId,
    chains,
    currentNetwork,
    isTestnet,
    isSupported,
    isPending,
    pendingChainId: variables?.chainId,
    switchChain,
    switchToDefaultNetwork,
    supportedNetworks: SUPPORTED_NETWORKS
  };
} 