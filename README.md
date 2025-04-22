# Web3 NFT Project

A full-stack Web3 application featuring NFT minting capabilities.

## Project Structure

- `frontend/`: Next.js frontend application
- `backend/`: NestJS backend API
- `contracts/`: Solidity smart contracts for NFT collection

## Features

- Authentication using JWT
- MetaMask wallet integration
- NFT Collection (10 images)
- Minting price: 0.0001 ETH per NFT
- Deployed on Abstract/Blast network

## Setup Instructions

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

### Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat deploy --network <network-name>
```

## Environment Variables

Create `.env` files in both frontend and backend directories with the following variables:

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed-contract-address>
```

### Backend (.env)
```
JWT_SECRET=your-secret-key
PORT=3001
```

## Smart Contract Details

- Network: Abstract/Blast
- Mint Price: 0.0001 ETH
- Collection Size: 10 NFTs
- Standard: ERC-721 