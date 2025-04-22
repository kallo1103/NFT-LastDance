# LastDance NFT Project

A decentralized NFT marketplace built with Next.js, Solidity, and Hardhat.

## Features

- NFT Minting
- NFT Collection Viewing
- Wallet Integration with RainbowKit
- Dark/Light Mode
- Responsive Design
- Smart Contract with Royalty Support

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- RainbowKit
- Wagmi
- ethers.js

### Smart Contract
- Solidity ^0.8.20
- OpenZeppelin Contracts
- Hardhat
- ERC721 Standard

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or any Web3 wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/lastdance-nft.git
cd lastdance-nft
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install smart contract dependencies
cd ../smart-contracts
npm install
```

3. Set up environment variables
```bash
# In frontend/.env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# In smart-contracts/.env
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

4. Run the development server
```bash
# Start frontend
cd frontend
npm run dev

# Deploy smart contract (in a new terminal)
cd smart-contracts
npx hardhat run scripts/deploy.js --network sepolia
```

## Smart Contract

The NFT contract includes:
- Minting functionality
- Royalty support (2.5%)
- Batch minting
- Supply limit of 10 NFTs
- One mint per address

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
