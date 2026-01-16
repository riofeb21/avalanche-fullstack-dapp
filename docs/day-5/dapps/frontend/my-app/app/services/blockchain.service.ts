export interface BlockchainValue {
    value: string;
    blockNumber: number;
    updatedAt: string;
}

export interface BlockchainEvent {
    blockNumber: string;
    value: string;
    txHash: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const getBlockchainValue = async (): Promise<BlockchainValue> => {
    const res = await fetch(`${BACKEND_URL}/blockchain/value`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch blockchain value');
    }

    return res.json();
};

export const getBlockchainEvents = async (): Promise<BlockchainEvent[]> => {
    const res = await fetch(`${BACKEND_URL}/blockchain/events`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch blockchain events');
    }
    return res.json();
};
