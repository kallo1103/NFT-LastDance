const hre = require("hardhat");

async function main() {
  const NFTCollection = await hre.ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy();

  await nftCollection.waitForDeployment();

  console.log("NFTCollection deployed to:", await nftCollection.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 