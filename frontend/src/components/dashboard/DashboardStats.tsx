import React from 'react';
import { WalletAccount } from '../WalletConnect';
import { ethers } from 'ethers';

interface DashboardStatsProps {
  accounts: WalletAccount[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ accounts }) => {
  const calculateTotalBalance = () => {
    return accounts.reduce((total, account) => total + parseFloat(account.balance || '0'), 0);
  };

  const getActiveNetworks = () => {
    const uniqueNetworks = new Set(accounts.map(account => account.network));
    return uniqueNetworks.size;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Calculate 24h change (mock data for now)
  const dailyChange = 2.5;
  const dailyVolume = 12675.50;
  const transactionCount = 15;

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-300">Total Balance</h3>
        <p className="text-2xl font-bold mt-2">{formatCurrency(calculateTotalBalance())}</p>
        <p className={`${dailyChange >= 0 ? 'text-green-400' : 'text-red-400'} text-sm mt-1`}>
          {dailyChange >= 0 ? '+' : ''}{dailyChange}% today
        </p>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-300">Active Networks</h3>
        <p className="text-2xl font-bold mt-2">{getActiveNetworks()}</p>
        <p className="text-gray-400 text-sm mt-1">Across {accounts.length} wallet{accounts.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-300">24h Volume</h3>
        <p className="text-2xl font-bold mt-2">{formatCurrency(dailyVolume)}</p>
        <p className="text-blue-400 text-sm mt-1">{transactionCount} transactions</p>
      </div>
    </div>
  );
}; 