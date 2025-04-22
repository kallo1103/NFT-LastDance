import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TransactionResponse, Block } from 'ethers';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  timestamp: number;
  blockNumber: number;
}

export const useTransactionHistory = (address: string | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        // Use environment variable for API key in production
        const provider = new ethers.JsonRpcProvider(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo'}`
        );
        
        // Get the last 10 blocks
        const currentBlock = await provider.getBlockNumber();
        const blockPromises = Array.from({ length: 10 }, (_, i) => 
          provider.getBlock(currentBlock - i, true)
        );

        const blocks = await Promise.all(blockPromises);
        const validBlocks = blocks.filter((block): block is Block => block !== null);

        // Get all transactions from these blocks
        const txPromises = validBlocks.flatMap(block => {
          // Ensure transactions are of type TransactionResponse[]
          const blockTxs = block.transactions as unknown as TransactionResponse[];
          return blockTxs.map(async (tx) => {
            if (!tx) return null;
            
            // Skip if transaction is not related to our address
            if (tx.from.toLowerCase() !== address.toLowerCase() && 
                (!tx.to || tx.to.toLowerCase() !== address.toLowerCase())) {
              return null;
            }

            try {
              return {
                hash: tx.hash,
                from: tx.from,
                to: tx.to || '',
                value: tx.value,
                timestamp: block.timestamp,
                blockNumber: block.number
              } as Transaction;
            } catch (err) {
              console.error('Error processing transaction:', err);
              return null;
            }
          });
        });

        const txs = await Promise.all(txPromises);
        const filteredTxs = txs
          .filter((tx): tx is Transaction => tx !== null)
          .sort((a, b) => b.timestamp - a.timestamp);

        setTransactions(filteredTxs);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();

    // Refresh transactions every 30 seconds
    const interval = setInterval(fetchTransactions, 30000);

    return () => clearInterval(interval);
  }, [address]);

  return { transactions, isLoading, error };
}; 