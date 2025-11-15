import { Command } from "@/commands/types/CommandAb.ts"
import type { ICommandDeclarationInit, ICommandsFsUtils, ICommandDeclaration } from "./types/ICommandDeclarationInit.ts"
export type {ICommandDeclarationInit}

export class CommandDeclarationInit implements ICommandDeclarationInit {
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