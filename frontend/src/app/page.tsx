'use client';

import { useAccount } from 'wagmi';
import { CryptoCard } from '@/components/dashboard/CryptoCard';
import { PortfolioChart } from '@/components/dashboard/PortfolioChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { TopMovers } from '@/components/dashboard/TopMovers';
import { ChartData } from 'chart.js';

export default function Dashboard() {
  const { isConnected } = useAccount();

  // Sample portfolio data
  const portfolioData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [10000, 12000, 11500, 13000, 12800, 14500, 15000],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        fill: true,
      },
    ],
  };

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to CryptoDash
        </h1>
        <p className="text-gray-600 mb-8">
          Connect your wallet to view your portfolio and track your investments
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CryptoCard
          name="Bitcoin"
          symbol="BTC"
          price={43567.89}
          change={2.5}
          icon="/icons/btc.svg"
        />
        <CryptoCard
          name="Ethereum"
          symbol="ETH"
          price={2345.67}
          change={-1.2}
          icon="/icons/eth.svg"
        />
        <CryptoCard
          name="Arbitrum"
          symbol="ARB"
          price={1.23}
          change={5.8}
          icon="/icons/arb.svg"
        />
        <CryptoCard
          name="Total Balance"
          value="$12,345.67"
          change={3.4}
          type="balance"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
            <PortfolioChart data={portfolioData} />
          </div>
        </div>
        <div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Top Movers</h2>
            <TopMovers />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <RecentTransactions />
      </div>
    </div>
  );
}
