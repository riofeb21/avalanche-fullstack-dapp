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
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const blockchain_service_1 = require("./blockchain.service");
const swagger_1 = require("@nestjs/swagger");
let BlockchainController = class BlockchainController {
    blockchainService;
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
    }
    async getValue() {
        return this.blockchainService.getLatestValue();
    }
    async getEvents() {
        return this.blockchainService.getValueUpdatedEvents();
    }
};
exports.BlockchainController = BlockchainController;
__decorate([
    (0, common_1.Get)("value"),
    (0, swagger_1.ApiOperation)({ summary: 'Get the latest value from the smart contract' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the current value, block number, and timestamp.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getValue", null);
__decorate([
    (0, common_1.Get)("events"),
    (0, swagger_1.ApiOperation)({ summary: 'Get ValueUpdated events' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a list of ValueUpdated events from the last 1000 blocks.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getEvents", null);
exports.BlockchainController = BlockchainController = __decorate([
    (0, swagger_1.ApiTags)('Blockchain'),
    (0, common_1.Controller)("blockchain"),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
//# sourceMappingURL=blockchain.controller.js.map