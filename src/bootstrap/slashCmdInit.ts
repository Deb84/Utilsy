import { add, exists } from '../services/slashCmdDeclaration/index.ts'
import type { ICommandsFsUtils } from '../utils/fsUtils/types/ICommandsFsUtils.ts'

interface ISlashCmdInit {
    declare(): Promise<void>
}

export class SlashCommandInit implements ISlashCmdInit {
    private commandFsUtils: ICommandsFsUtils

    constructor(commandFsUtils: ICommandsFsUtils) {
        this.commandFsUtils = commandFsUtils
        this.declare()
    }

    async declare() {
        const commands = await this.commandFsUtils.importAllCommands({noCache: true})
        for (const command of commands) {
            const commandData = command.data
            if (!(await exists(commandData))) {
                add(commandData)
            } 
        }
    }
}