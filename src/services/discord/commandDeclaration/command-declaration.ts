import type { ICommandDeclaration, ICommandRegistar, IAccessHandler } from "./types/ICommandDeclaration"

export class CommandDeclaration implements ICommandDeclaration {
    private commandRegistar: ICommandRegistar
    private accessHandler: IAccessHandler

    constructor(commandRegistar: ICommandRegistar, accessHandler: IAccessHandler) {
        this.commandRegistar = commandRegistar
        this.accessHandler = accessHandler
    }

    add(commandData: CommandData) {
        return addCommand(this.rest, this.accessHandler, commandData)
    }

    remove(commandData: CommandData) {
        return returnremoveCommand(this.rest, this.accessHandler, commandData)
    }

    async get(commandData: CommandData) {
        return await getCommand(this.rest, this.accessHandler, commandData)
    }

    async exists(commandData: CommandData) {
        return await existsCommand(this.rest, this.accessHandler, commandData)
    }
}