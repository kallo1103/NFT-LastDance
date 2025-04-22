interface CryptoCardProps {
  name: string;
  symbol?: string;
  price?: number;
  value?: string;
  change: number;
  icon?: string;
  type?: 'crypto' | 'balance';
}

export function CryptoCard({ name, symbol, price, value, change, icon, type = 'crypto' }: CryptoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <img src={icon} alt={name} className="w-8 h-8" />
          )}
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            {symbol && <p className="text-sm text-gray-500">{symbol}</p>}
          </div>
        </div>
        <div className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
          change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {type === 'crypto' && price ? `$${price.toLocaleString()}` : value}
      </div>
    </div>
  );
} 