import type { ISlashDeclaration } from '../services/slashCmdDeclaration/types/ISlashCmdDeclaration.ts'
import type { ICommandsFsUtils } from '../utils/fsUtils/types/ICommandsFsUtils.ts'

interface ISlashCmdInit {
    declare(): Promise<void>
}

export class SlashCommandInit implements ISlashCmdInit {
    private commandFsUtils: ICommandsFsUtils
    private slashCmdDeclaration: ISlashDeclaration

    constructor(commandFsUtils: ICommandsFsUtils, slashCmdDeclaration: ISlashDeclaration) {
        this.commandFsUtils = commandFsUtils
        this.slashCmdDeclaration = slashCmdDeclaration
        this.declare()
    }

    async declare() {
        const commands = await this.commandFsUtils.importAllCommands({noCache: true})
        for (const command of commands) {
            const commandData = command.data
            if (!(await this.slashCmdDeclaration.exists(commandData))) {
                this.slashCmdDeclaration.add(commandData)
            } 
        }
    }
}