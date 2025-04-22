const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to update the .env.local file with the contract address
function updateEnvFile(contractAddress) {
  const envPath = path.join(__dirname, 'frontend', '.env.local');
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace the placeholder with the actual contract address
  envContent = envContent.replace(
    /NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=.*/,
    `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${contractAddress}`
  );
  
  fs.writeFileSync(envPath, envContent);
  console.log(`Updated .env.local with contract address: ${contractAddress}`);
}

// Function to extract the contract address from the deployment output
function extractContractAddress(output) {
  const match = output.match(/NFTCollection deployed to: (0x[a-fA-F0-9]{40})/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Main function
async function main() {
  try {
    console.log('Deploying NFT contract...');
    
    // Run the deployment script
    const deploymentOutput = execSync('cd smart-contracts && npx hardhat run scripts/deploy.js --network localhost', { encoding: 'utf8' });
    console.log(deploymentOutput);
    
    // Extract the contract address
    const contractAddress = extractContractAddress(deploymentOutput);
    
    if (contractAddress) {
      // Update the .env.local file
      updateEnvFile(contractAddress);
      console.log('Deployment and environment update completed successfully!');
    } else {
      console.error('Failed to extract contract address from deployment output');
    }
  } catch (error) {
    console.error('Error during deployment:', error.message);
  }
}

main(); 