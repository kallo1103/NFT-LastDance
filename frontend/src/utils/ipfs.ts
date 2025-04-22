'use client';

import { create } from 'ipfs-http-client';

// Configure IPFS client with your preferred gateway
const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const auth = typeof window !== 'undefined' 
  ? `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`
  : '';

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    const added = await client.add(
      new Uint8Array(await file.arrayBuffer())
    );
    return `ipfs://${added.path}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

export async function uploadMetadataToIPFS(metadata: {
  name: string;
  description: string;
  image: string;
}): Promise<string> {
  try {
    const data = JSON.stringify(metadata);
    const added = await client.add(
      new TextEncoder().encode(data)
    );
    return `ipfs://${added.path}`;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw error;
  }
} 