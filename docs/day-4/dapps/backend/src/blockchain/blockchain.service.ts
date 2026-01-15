import { Injectable } from "@nestjs/common";
import { createPublicClient, http } from "viem";
import { avalancheFuji } from "viem/chains";
import { SIMPLE_STORAGE_ABI } from "./simple-storage.abi";

@Injectable()
export class BlockchainService {
    private client;
    private contractAddress: `0x${string}`;

    constructor() {
        this.client = createPublicClient({
            chain: avalancheFuji,
            transport: http("https://api.avax-test.network/ext/bc/C/rpc"),
        });

        // address hasil deploy Day 2
        this.contractAddress = "0x23b9c596b547f001b2c3577edf5e039f07bff8a5" as `0x${string}`;
    }

    // 🔹 Read latest value
    async getLatestValue() {
        const [value, block] = await Promise.all([
            this.client.readContract({
                address: this.contractAddress,
                abi: SIMPLE_STORAGE_ABI,
                functionName: "getValue",
            }),
            this.client.getBlock(),
        ]);

        return {
            value: value.toString(),
            blockNumber: Number(block.number),
            updatedAt: new Date(Number(block.timestamp) * 1000).toISOString(),
        };
    }

    // 🔹 Read ValueUpdated events
    async getValueUpdatedEvents() {
        const currentBlock = await this.client.getBlockNumber();
        const events = await this.client.getLogs({
            address: this.contractAddress,
            event: {
                type: "event",
                name: "ValueUpdated",
                inputs: [
                    {
                        name: "newValue",
                        type: "uint256",
                        indexed: false,
                    },
                ],
            },
            fromBlock: currentBlock - 1000n,
            toBlock: "latest",
        });

        return events.map((event) => ({
            blockNumber: event.blockNumber?.toString(),
            value: event.args.newValue?.toString(),
            txHash: event.transactionHash,
        }));
    }
}
