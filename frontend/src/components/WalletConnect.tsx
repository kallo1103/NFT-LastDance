'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { formatDistanceToNow } from 'date-fns';
import { config } from '../config/wagmi';
import { useState, useEffect } from 'react';

// Create a client
const queryClient = new QueryClient();

function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { transactions, isLoading: txLoading, error: txError } = useTransactionHistory(address);

  if (!isConnected || !address) {
    return (
      <button
        onClick={() => open()}
        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-3 px-6 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-900/30">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div>
              <p className="text-gray-400">Connected Wallet</p>
              <p className="text-white font-medium">{address.slice(0, 6)}...{address.slice(-4)}</p>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="text-gray-400 hover:text-white transition-colors"
            title="Disconnect Wallet"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Balance</span>
            <span className="text-white font-medium">
              {balance ? `${Number(ethers.formatEther(balance.value)).toFixed(4)} ETH` : 'Loading...'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        {txLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-400"></div>
          </div>
        )}
        {txError && (
          <div className="text-red-400 text-sm py-2">
            Error: {txError}
          </div>
        )}
        {transactions.length === 0 && !txLoading && (
          <p className="text-gray-400 text-center py-4">No recent transactions found</p>
        )}
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.hash} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    {tx.from.toLowerCase() === address.toLowerCase() ? (
                      <span className="text-red-400">Sent</span>
                    ) : (
                      <span className="text-green-400">Received</span>
                    )}
                    <span className="text-white font-medium">
                      {ethers.formatEther(tx.value)} ETH
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {tx.from.toLowerCase() === address.toLowerCase() ? 'To: ' : 'From: '}
                    <span className="font-mono">
                      {(tx.from.toLowerCase() === address.toLowerCase() ? tx.to : tx.from).slice(0, 6)}...
                      {(tx.from.toLowerCase() === address.toLowerCase() ? tx.to : tx.from).slice(-4)}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(tx.timestamp * 1000, { addSuffix: true })}
                  </p>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-400 hover:text-primary-300 mt-1 inline-block"
                  >
                    View on Etherscan
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletInfo />
      </QueryClientProvider>
    </WagmiConfig>
  );
} 