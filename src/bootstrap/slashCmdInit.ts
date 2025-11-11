import { Command } from "@/commands/types/CommandAb.ts"
import type { ISlashCmdInit, ICommandsFsUtils, ICommandDeclaration } from "./types/ISlashCmdInit.ts"
export type {ISlashCmdInit}

export class SlashCommandInit implements ISlashCmdInit {
    private commandFsUtils: ICommandsFsUtils
    private commandDeclaration: ICommandDeclaration

    constructor(commandFsUtils: ICommandsFsUtils, commandDeclaration: ICommandDeclaration) {
        this.commandFsUtils = commandFsUtils
        this.commandDeclaration = commandDeclaration
    }

    async declare() {
        const commands = await this.commandFsUtils.importAllCommands({noCache: true})

        for (const command of commands) {
            const commandData = command.default

            const existResult = await this.commandDeclaration.exists(commandData)

            if (existResult.type === 'ok' && existResult.value === false) {
                this.commandDeclaration.add(commandData)
            }
            if (existResult.type === 'err') {
                console.error(existResult.error)
            }
        }
    }
}