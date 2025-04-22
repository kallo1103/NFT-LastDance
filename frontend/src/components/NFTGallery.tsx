import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function NFTGallery() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      // Here you would typically fetch NFTs from your backend or directly from the blockchain
      // This is a placeholder for demonstration
      setLoading(false);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setLoading(false);
    }
  };

  const mintNFT = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // Here you would interact with your smart contract
        // This is a placeholder for demonstration
        console.log('Minting NFT...');
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">NFT Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <div key={index} className="border p-4 rounded">
            {/* NFT display logic here */}
          </div>
        ))}
      </div>
      <button
        onClick={mintNFT}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Mint NFT (0.0001 ETH)
      </button>
    </div>
  );
} 