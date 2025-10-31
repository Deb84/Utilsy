import type { ICommandDeclaration, IAccessHandler, REST } from "./types/ICommandDeclaration"

export class CommandDeclaration implements ICommandDeclaration {
    private rest: REST
    private accessHandler: IAccessHandler

    constructor(rest: REST, accessHandler: IAccessHandler) {
        this.rest = rest
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