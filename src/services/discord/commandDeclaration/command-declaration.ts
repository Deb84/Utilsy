import type { ICommandDeclaration, ICommandRegistar, IAccessHandler } from "./types/ICommandDeclaration.ts"
import * as Modules from './modules/index.ts'
export {ICommandDeclaration}

export class CommandDeclaration implements ICommandDeclaration {
    private addCommand: Modules.AddCommand
    private getCommand: Modules.GetCommand
    private commandExists: Modules.CommandExists
    private removeCommand: Modules.RemoveCommand

    constructor(private commandRegistar: ICommandRegistar, private accessHandler: IAccessHandler) {
        this.addCommand = new Modules.AddCommand(commandRegistar, accessHandler)
        this.getCommand = new Modules.GetCommand(commandRegistar, accessHandler)
        this.commandExists = new Modules.CommandExists(this.getCommand)
        this.removeCommand = new Modules.RemoveCommand(this.getCommand, commandRegistar)
    }

    add(commandData: CommandData) {
        return this.addCommand.add(commandData) // need to handle error below
    }

    remove(commandData: CommandData) {
        return this.removeCommand.remove(commandData) // need to handle error below
    }

    async get(commandData: CommandData) {
        return await this.getCommand.get(commandData)
    }

    async exists(commandData: CommandData) {
        return await this.commandExists.exists(commandData)
    }
}