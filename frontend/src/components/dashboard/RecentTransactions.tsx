import { formatDistanceToNow } from 'date-fns';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: string;
  token: string;
  address: string;
  timestamp: Date;
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'send',
    amount: '0.5',
    token: 'ETH',
    address: '0x1234...5678',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '2',
    type: 'receive',
    amount: '1000',
    token: 'ARB',
    address: '0x8765...4321',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    type: 'swap',
    amount: '1000',
    token: 'USDC → ETH',
    address: '0x9876...1234',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

export function RecentTransactions() {
  return (
    <div className="divide-y divide-gray-200">
      {sampleTransactions.map((tx) => (
        <div key={tx.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${tx.type === 'send' ? 'bg-red-100' : tx.type === 'receive' ? 'bg-green-100' : 'bg-purple-100'}
            `}>
              {tx.type === 'send' ? (
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              ) : tx.type === 'receive' ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
              </p>
              <p className="text-sm text-gray-500">{tx.address}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {tx.type === 'send' ? '-' : ''}{tx.amount} {tx.token}
            </p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 