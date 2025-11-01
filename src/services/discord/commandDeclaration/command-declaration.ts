import type { ICommandDeclaration, ICommandRegistar, IAccessHandler } from "./types/ICommandDeclaration.ts"
import * as Module from './modules/index.ts'

export class CommandDeclaration implements ICommandDeclaration {
    private addCommand: Module.AddCommand
    private getCommand: Module.GetCommand
    private commandExists: Module.CommandExists
    private removeCommand: Module.RemoveCommand

    constructor(private commandRegistar: ICommandRegistar, private accessHandler: IAccessHandler) {
        this.addCommand = new Module.AddCommand(commandRegistar, accessHandler)
        this.getCommand = new Module.GetCommand(commandRegistar, accessHandler)
        this.commandExists = new Module.CommandExists(this.getCommand)
        this.removeCommand = new Module.RemoveCommand(this.getCommand, commandRegistar)
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