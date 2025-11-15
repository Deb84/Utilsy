import * as R from 'result'
import type { IAccessResolver } from "@/services/accessResolver/access-resolver.ts";
import type { IAccessHandler, CommandInteraction } from "./types/IAccessHandler.ts";
import { GenericAccessError } from '@/errors/internal/access-errors.ts';
export type {IAccessHandler}

// case 
// command public & bot public -> everyone              
// command test & bot public -> only testers           
// command private & bot public -> only private         

// command public & bot test -> only testers            
// command test & bot test -> only testers              
// command private & bot test -> only private           

// command public & bot private -> only private
// command test & bot private -> only private
// command private & bot private -> only private

export class AccessHandler implements IAccessHandler {
    constructor(
        private accessResolver: IAccessResolver
    ) {}


    async hasCommandAccess(interaction: CommandInteraction, command: ICommandClass) { // build err
        const result = await this.accessResolver.hasCommandAccess(interaction, command)
        if (result.type === 'ok') return result
        return R.err(new GenericAccessError())
    }

    async resolveCommandAccess(command: ICommandClass) {
        return await this.accessResolver.resolveCommandAccess(command)
    }
}