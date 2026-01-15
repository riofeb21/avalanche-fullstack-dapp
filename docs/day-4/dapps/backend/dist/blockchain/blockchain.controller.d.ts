import { BlockchainService } from "./blockchain.service";
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    getValue(): Promise<{
        value: any;
        blockNumber: number;
        updatedAt: string;
    }>;
    getEvents(): Promise<any>;
}
