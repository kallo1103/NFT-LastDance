const fs = require('fs');
const path = require('path');

// Get the contract address from command line arguments
const contractAddress = process.argv[2];

if (!contractAddress) {
  console.error('Please provide a contract address as a command line argument');
  console.error('Usage: node update-env.js 0x123...abc');
  process.exit(1);
}

// Validate the contract address format
if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
  console.error('Invalid contract address format. It should be a 0x-prefixed 40-character hex string');
  process.exit(1);
}

// Update the .env.local file
const envPath = path.join(__dirname, 'frontend', '.env.local');
const envContent = `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${contractAddress}
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=3ee50caa36f61d90aa160bfbde09b830`;

fs.writeFileSync(envPath, envContent);
console.log(`Updated .env.local with contract address: ${contractAddress}`);
console.log('You can now run your frontend application with the updated contract address'); 