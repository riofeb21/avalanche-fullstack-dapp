'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract';

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  // State for input value
  const [inputValue, setInputValue] = useState('');
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [isHydrated, setIsHydrated] = useState(false);

  // Read contract - getValue()
  const { data: storedValue, refetch: refetchValue, isLoading: isReadLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getValue',
  });

  // Read contract - owner
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  // Write contract - setValue()
  const { writeContractAsync, isPending: isWritePending, error: writeError } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Handle setValue
  const handleSetValue = async () => {
    if (!inputValue) return;

    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'setValue',
        args: [BigInt(inputValue)],
      });
      setTxHash(hash);
    } catch (error) {
      console.error('Error writing to contract:', error);
    }
  };

  // Refetch value after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetchValue();
      setInputValue('');
      setTimeout(() => setTxHash(undefined), 5000); // Clear success message after 5s
    }
  }, [isConfirmed, refetchValue]);

  // Hydration check
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Shorten address helper
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">SimpleStorage dApp</h1>
          <p className="text-gray-300">Interact with your smart contract on Avalanche Fuji</p>
        </div>

        {/* Wallet Connection Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-4">🔐 Step 1: Connect Wallet</h2>

          {!isHydrated ? (
            <div className="h-12 bg-black/20 rounded-lg animate-pulse" />
          ) : !isConnected ? (
            <button
              onClick={() => connect({ connector: injected() })}
              disabled={isConnecting}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? 'Connecting...' : 'Connect Core Wallet'}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-4 space-y-2">
                <p className="text-sm text-gray-300">Connected Address:</p>
                <p className="font-mono text-white text-sm break-all">{address}</p>
                <p className="text-xs text-gray-400">Short: {shortenAddress(address!)}</p>
              </div>

              <div className="bg-black/20 rounded-lg p-4 space-y-2">
                <p className="text-sm text-gray-300">Network:</p>
                <p className="text-white font-semibold">{chain?.name || 'Unknown'}</p>
                {chain?.id !== 43113 && (
                  <p className="text-yellow-400 text-xs">⚠️ Please switch to Avalanche Fuji Testnet</p>
                )}
              </div>

              <button
                onClick={() => disconnect()}
                className="w-full px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/30"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Contract Interaction Card */}
        {isHydrated && isConnected && chain?.id === 43113 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl space-y-6">

            {/* Read Contract */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">📖 Step 2: Read Contract</h2>
              <div className="bg-black/20 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current Stored Value:</span>
                  <button
                    onClick={() => refetchValue()}
                    disabled={isReadLoading}
                    className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-all disabled:opacity-50"
                  >
                    {isReadLoading ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
                <p className="text-3xl font-bold text-white">
                  {isReadLoading ? '...' : storedValue?.toString() || '0'}
                </p>
              </div>

              <div className="mt-3 bg-black/20 rounded-lg p-3">
                <p className="text-xs text-gray-300">Contract Owner:</p>
                <p className="font-mono text-xs text-white break-all">{owner || 'Loading...'}</p>
                {isOwner && (
                  <p className="text-xs text-green-400 mt-1">✅ You are the owner</p>
                )}
              </div>
            </div>

            {/* Write Contract */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">✍️ Step 3: Write Contract</h2>

              {!isOwner ? (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm">
                    ⚠️ Only the contract owner can set values. Current owner: {owner ? shortenAddress(owner) : 'Unknown'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">New Value:</label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter a number"
                      disabled={isWritePending || isConfirming}
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
                    />
                  </div>

                  <button
                    onClick={handleSetValue}
                    disabled={!inputValue || isWritePending || isConfirming}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isWritePending ? 'Waiting for Approval...' : isConfirming ? 'Confirming Transaction...' : 'Set Value'}
                  </button>
                </div>
              )}
            </div>

            {/* Transaction Feedback */}
            {(txHash || writeError) && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">📊 Transaction Status</h2>

                {writeError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-300 text-sm font-semibold">❌ Transaction Failed</p>
                    <p className="text-red-200 text-xs mt-2 break-all">
                      {writeError.message.includes('User rejected')
                        ? 'You rejected the transaction'
                        : writeError.message}
                    </p>
                  </div>
                )}

                {txHash && (
                  <div className={`border rounded-lg p-4 ${isConfirmed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                    }`}>
                    <p className={`text-sm font-semibold ${isConfirmed ? 'text-green-300' : 'text-blue-300'
                      }`}>
                      {isConfirmed
                        ? '✅ Transaction Complete!'
                        : '✅ Wallet Approved! Waiting for Block Confirmation...'}
                    </p>
                    {!isConfirmed && (
                      <div className="mt-2 flex items-center space-x-2 text-xs text-blue-200">
                        <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <span>Broadcasting to Avalanche Fuji Network...</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-300 mt-2">Transaction Hash:</p>
                    <a
                      href={`https://testnet.snowtrace.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-white hover:text-purple-300 transition-colors break-all underline"
                    >
                      {txHash}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Contract Info */}
            <div className="bg-black/20 rounded-lg p-4 border-t border-white/10">
              <p className="text-xs text-gray-400">Contract Address:</p>
              <a
                href={`https://testnet.snowtrace.io/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white hover:text-purple-300 transition-colors break-all underline"
              >
                {CONTRACT_ADDRESS}
              </a>
            </div>
          </div>
        )}

        {/* Wrong Network Warning */}
        {isHydrated && isConnected && chain?.id !== 43113 && (
          <div className="bg-yellow-500/10 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">⚠️ Wrong Network</h2>
            <p className="text-yellow-200 text-sm">
              Please switch to Avalanche Fuji Testnet (Chain ID: 43113) in your wallet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
