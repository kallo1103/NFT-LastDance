interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

const sampleTokens: Token[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3521.45,
    change24h: 5.67,
    volume24h: 15234567890,
  },
  {
    id: '2',
    name: 'Arbitrum',
    symbol: 'ARB',
    price: 1.85,
    change24h: -3.21,
    volume24h: 987654321,
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    price: 125.78,
    change24h: 12.34,
    volume24h: 5678901234,
  },
  {
    id: '4',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 18.92,
    change24h: -1.45,
    volume24h: 345678901,
  },
  {
    id: '5',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.98,
    change24h: 8.76,
    volume24h: 789012345,
  },
];

export function TopMovers() {
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    }
    if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    }
    return `$${volume.toLocaleString()}`;
  };

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        {sampleTokens.map((token) => (
          <div
            key={token.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{token.symbol}</span>
              <span
                className={`text-sm font-medium ${
                  token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </span>
            </div>
            <div className="text-lg font-semibold mb-1">
              ${token.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-sm text-gray-500">
              Vol: {formatVolume(token.volume24h)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 