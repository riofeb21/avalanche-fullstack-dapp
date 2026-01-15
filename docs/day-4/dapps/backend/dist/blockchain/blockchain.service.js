"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const simple_storage_abi_1 = require("./simple-storage.abi");
let BlockchainService = class BlockchainService {
    client;
    contractAddress;
    constructor() {
        this.client = (0, viem_1.createPublicClient)({
            chain: chains_1.avalancheFuji,
            transport: (0, viem_1.http)("https://api.avax-test.network/ext/bc/C/rpc"),
        });
        this.contractAddress = "0x23b9c596b547f001b2c3577edf5e039f07bff8a5";
    }
    async getLatestValue() {
        const [value, block] = await Promise.all([
            this.client.readContract({
                address: this.contractAddress,
                abi: simple_storage_abi_1.SIMPLE_STORAGE_ABI,
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
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BlockchainService);
//# sourceMappingURL=blockchain.service.js.map