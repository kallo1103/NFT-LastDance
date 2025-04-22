# NFT Marketplace Frontend

A modern, decentralized NFT marketplace built with Next.js, Wagmi, and Web3Modal.

## Features

- 🔗 Multi-chain support (Ethereum, Polygon, Optimism, Arbitrum, BSC, Avalanche, Base)
- 👛 Multiple wallet connections
- 💰 Token balances tracking (Native + ERC20)
- 📊 Real-time transaction history
- 🎨 Modern, responsive UI with Tailwind CSS
- 🌙 Dark mode support
- 🔒 Secure wallet integration
- ⚡ Optimized performance
- 🔄 API Integration with Backend Services

## System Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   Frontend  │ <── │   Backend   │ <── │  Blockchain  │
│  Next.js    │ ──> │  Express.js │ ──> │  Networks    │
└─────────────┘     └─────────────┘     └──────────────┘
```

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- MetaMask or any Web3 wallet
- MongoDB (for backend)

## Getting Started

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the frontend directory with the following variables:
```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Contract Addresses
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=your_marketplace_contract_address
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=your_token_contract_address

# Web3 Configuration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_DEFAULT_CHAIN_ID=1

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET=your_infura_project_secret
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd ../backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nft_marketplace

# JWT Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Web3 Configuration
ALCHEMY_API_KEY=your_alchemy_api_key
INFURA_PROJECT_ID=your_infura_project_id
INFURA_PROJECT_SECRET=your_infura_project_secret

# Smart Contract Addresses
NFT_CONTRACT_ADDRESS=your_nft_contract_address
MARKETPLACE_CONTRACT_ADDRESS=your_marketplace_contract_address
```

4. Start MongoDB:
Make sure MongoDB is running on your system.

5. Run the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will be available at [http://localhost:3001](http://localhost:3001).

## API Documentation

The backend provides the following API endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### NFTs
- `GET /api/nfts` - Get all NFTs
- `GET /api/nfts/:id` - Get NFT details
- `POST /api/nfts` - Create new NFT
- `PUT /api/nfts/:id` - Update NFT
- `DELETE /api/nfts/:id` - Delete NFT

### Marketplace
- `GET /api/marketplace/listings` - Get all listings
- `POST /api/marketplace/listings` - Create new listing
- `GET /api/marketplace/listings/:id` - Get listing details
- `PUT /api/marketplace/listings/:id` - Update listing
- `DELETE /api/marketplace/listings/:id` - Delete listing

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/transactions` - Create new transaction

## Project Structure

```
project/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   └── types/
│   └── public/
│
├── backend/           # Express.js backend application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── tests/           # Backend tests
│
└── contracts/         # Smart Contracts
    ├── src/
    │   ├── NFT.sol
    │   └── Marketplace.sol
    └── tests/
```

## Key Components

### WalletConnect
Handles wallet connections using Web3Modal and Wagmi. Supports multiple wallets and chains.

### Network Management
The `useNetwork` hook provides:
- Chain switching
- Network status
- Support for multiple networks
- Testnet detection

### Token Balances
The `useTokenBalances` hook offers:
- Native token balance tracking
- ERC20 token support
- Real-time updates
- Multi-chain token support

## Supported Networks

- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- BNB Smart Chain
- Avalanche
- Base

## Supported Tokens

### Ethereum Mainnet
- ETH (Native)
- USDC
- USDT

### Polygon
- MATIC (Native)
- USDC

Additional tokens can be added in `src/hooks/useTokenBalances.ts`

## Development

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linting
npm run lint
```

### Adding New Networks

1. Update `SUPPORTED_NETWORKS` in `src/hooks/useNetwork.ts`
2. Add network configuration in `src/config/wagmi.ts`
3. Add token configurations in `src/hooks/useTokenBalances.ts`

### Adding New Tokens

Update the `TOKENS` configuration in `src/hooks/useTokenBalances.ts`:

```typescript
const TOKENS: TokenConfig = {
  [chainId]: {
    [tokenSymbol]: {
      address: "token_contract_address",
      decimals: 18,
      icon: "token_icon_url"
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

- Never commit private keys or sensitive data
- Use environment variables for all secrets
- Keep dependencies updated
- Follow Web3 security best practices

## Support

For support, please open an issue in the repository or contact the development team.
