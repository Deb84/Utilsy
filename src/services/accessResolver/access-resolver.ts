import * as Modules from './modules/index.ts'
import type { IAccessResolver, CommandInteraction } from './types/IAccessResolver.ts'
export type {IAccessResolver}

export class AccessResolver implements IAccessResolver {
    constructor(
        private config: BotConfig
    ) {}


    async resolveCommandAccess(command: ICommandClass) {
        return await Modules.resolveCommandAccess(this.config, command)
    }

    async hasCommandAccess(interaction: CommandInteraction, command: ICommandClass) {
        return await Modules.hasCommandAccess(
            Modules.accessModel, 
            this.config,
            interaction,
            command
        )
    }
}