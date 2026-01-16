export declare class BlockchainService {
    private client;
    private contractAddress;
    constructor();
    getLatestValue(): Promise<{
        value: any;
        blockNumber: number;
        updatedAt: string;
    }>;
    getValueUpdatedEvents(): Promise<any>;
}
