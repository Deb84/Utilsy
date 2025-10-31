import addCommand from './add.ts'
import removeCommand from './remove.ts'
import getCommand from './get.ts'
import existsCommand from './exists.ts'
import type {IAccessHandler} from '../../handlers/types/IAccessHandler.ts'
import type { ISlashDeclaration, REST } from './types/ISlashCmdDeclaration.ts'


export default class SlashCmdDeclaration implements ISlashDeclaration {
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
        return removeCommand(this.rest, this.accessHandler, commandData)
    }

    get(commandData: CommandData) {
        return getCommand(this.rest, this.accessHandler, commandData)
    }

    exists(commandData: CommandData) {
        return existsCommand(this.rest, this.accessHandler, commandData)
    }
}