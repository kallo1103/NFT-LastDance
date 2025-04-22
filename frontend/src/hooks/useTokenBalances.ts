import { useState, useEffect } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { SUPPORTED_NETWORKS } from './useNetwork';

interface TokenBalance {
  symbol: string;
  balance: string;
  formatted: string;
  decimals: number;
  value: bigint;
  address?: string;
  icon?: string;
}

interface TokenConfig {
  [chainId: number]: {
    [symbol: string]: {
      address: string;
      decimals: number;
      icon?: string;
    };
  };
}

const TOKENS: TokenConfig = {
  1: { // Ethereum Mainnet
    ETH: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      icon: 'https://ethereum.org/static/eth-diamond-rainbow.png'
    },
    USDC: {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
    },
    USDT: {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
    }
  },
  137: { // Polygon
    MATIC: {
      address: '0x0000000000000000000000000000000000001010',
      decimals: 18,
      icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
    },
    USDC: {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
      icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
    }
  }
};

export function useTokenBalances() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get native token balance
  const { data: nativeBalance, isError: nativeError } = useBalance({
    address,
    chainId
  });

  useEffect(() => {
    const fetchBalances = async () => {
      if (!isConnected || !address || !chainId) {
        setBalances([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const chainTokens = TOKENS[chainId] || {};
        const network = SUPPORTED_NETWORKS[chainId];

        // Add native token balance
        const balancesList: TokenBalance[] = [];
        if (nativeBalance) {
          balancesList.push({
            symbol: network?.nativeCurrency.symbol || 'ETH',
            balance: nativeBalance.value.toString(),
            formatted: nativeBalance.formatted,
            decimals: 18,
            value: nativeBalance.value,
            icon: network?.icon
          });
        }

        // Add other token balances
        for (const [symbol, token] of Object.entries(chainTokens)) {
          if (token.address === '0x0000000000000000000000000000000000000000') continue;

          try {
            const balance = await fetchTokenBalance(address, token.address, token.decimals);
            if (balance) {
              balancesList.push({
                symbol,
                ...balance,
                address: token.address,
                icon: token.icon
              });
            }
          } catch (err) {
            console.error(`Error fetching ${symbol} balance:`, err);
          }
        }

        setBalances(balancesList);
      } catch (err) {
        console.error('Error fetching token balances:', err);
        setError('Failed to fetch token balances');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [address, chainId, isConnected, nativeBalance]);

  return {
    balances,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      // The effect will automatically re-run
    }
  };
}

async function fetchTokenBalance(address: string, tokenAddress: string, decimals: number) {
  try {
    // Here you would typically use ethers.js or viem to fetch ERC20 token balances
    // This is a placeholder that should be implemented with actual contract calls
    return {
      balance: '0',
      formatted: '0',
      decimals,
      value: BigInt(0)
    };
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return null;
  }
} 