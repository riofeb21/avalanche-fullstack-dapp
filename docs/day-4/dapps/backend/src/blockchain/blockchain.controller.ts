import { Controller, Get } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Blockchain')
@Controller("blockchain")
export class BlockchainController {
    constructor(private readonly blockchainService: BlockchainService) { }

    // GET /blockchain/value
    @Get("value")
    @ApiOperation({ summary: 'Get the latest value from the smart contract' })
    @ApiResponse({ status: 200, description: 'Returns the current value, block number, and timestamp.' })
    async getValue() {
        return this.blockchainService.getLatestValue();
    }

    // GET /blockchain/events
    @Get("events")
    @ApiOperation({ summary: 'Get ValueUpdated events' })
    @ApiResponse({ status: 200, description: 'Returns a list of ValueUpdated events from the last 1000 blocks.' })
    async getEvents() {
        return this.blockchainService.getValueUpdatedEvents();
    }
}
