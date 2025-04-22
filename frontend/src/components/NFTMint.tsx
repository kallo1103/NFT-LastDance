'use client';

import { useState, useRef } from 'react';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import { parseEther } from 'viem';
import { uploadToIPFS, uploadMetadataToIPFS } from '@/utils/ipfs';

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;
const NFT_CONTRACT_ABI = [
  {
    name: 'mintNFT',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'tokenURI', type: 'string' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
  },
] as const;

export default function NFTMint() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isMinted, setIsMinted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isConnected } = useAccount();

  const { writeContract, isPending: isMinting } = useWriteContract();

  // Watch for Transfer events
  useWatchContractEvent({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    eventName: 'Transfer',
    onLogs(logs) {
      setIsMinted(true);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsUploading(true);
      // Upload image to IPFS
      const imageUrl = await uploadToIPFS(file);
      
      // Create and upload metadata
      const metadata = {
        name,
        description,
        image: imageUrl,
      };
      
      const tokenURI = await uploadMetadataToIPFS(metadata);
      
      // Mint NFT with the metadata URI
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mintNFT',
        args: [tokenURI],
        value: parseEther('0.01'), // Example mint price
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to mint NFTs</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Mint New NFT</h2>
      <form onSubmit={handleMint} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NFT Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            required
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {file ? 'Change Image' : 'Select Image'}
          </button>
        </div>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <img
              src={previewUrl}
              alt="NFT Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isMinting || isUploading}
          className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg 
            ${(isMinting || isUploading) ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-blue-700'} 
            transition-all`}
        >
          {isUploading ? 'Uploading to IPFS...' : isMinting ? 'Minting...' : 'Mint NFT'}
        </button>

        {isMinted && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
            NFT minted successfully! View on Explorer
          </div>
        )}
      </form>
    </div>
  );
} 