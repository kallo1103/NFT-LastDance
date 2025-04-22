import React from 'react';
import WalletConnect from '../WalletConnect';
import { RecentTransactions } from './RecentTransactions';
import '@fontsource/inter';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Wallet Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your crypto wallets and view recent transactions</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Wallet Connect Section */}
          <div className="lg:col-span-8 bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Connected Wallets</h2>
            <WalletConnect />
          </div>

          {/* Recent Transactions Section */}
          <div className="lg:col-span-4 bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <RecentTransactions />
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-300">Total Balance</h3>
            <p className="text-2xl font-bold mt-2">$25,432.89</p>
            <p className="text-green-400 text-sm mt-1">+2.5% today</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-300">Active Networks</h3>
            <p className="text-2xl font-bold mt-2">4</p>
            <p className="text-gray-400 text-sm mt-1">Across all wallets</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-300">24h Volume</h3>
            <p className="text-2xl font-bold mt-2">$12,675.50</p>
            <p className="text-blue-400 text-sm mt-1">15 transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 