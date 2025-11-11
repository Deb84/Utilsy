import { CommandInteraction, Interaction } from "discord.js";
import { ShowableErrorOptions } from "./base/ShowableError.ts";
import { ShowableCommandErr } from "./base/ShowableCmdErr.ts";

type CommandErrOpt = ShowableErrorOptions & {
    msg?: string
    commandName: string
    subCommandName?: string
    userId: string
    interaction: Interaction
    result?: Result
}

type SubCommandName = string | undefined
type ResultValue = Result | undefined

export class GenericCmdErr extends ShowableCommandErr {
    defaultMsg: string
    ephermeral = true
    subCommandName: SubCommandName
    commandName: string
    userId: string
    interaction: Interaction
    result: Result | undefined

    constructor(options: CommandErrOpt) {
        const defaultMsg = "Generic Command Error"
        super(options.msg || defaultMsg, options)
        this.defaultMsg= defaultMsg
        this.commandName = options.commandName
        this.subCommandName = options.subCommandName
        this.userId = options.userId
        this.interaction = options.interaction
    }
}

export class NoPermissionCmd extends ShowableCommandErr {
    defaultMsg: string
    ephermeral = true
    subCommandName: SubCommandName
    commandName: string
    userId: string
    interaction: Interaction
    result: Result | undefined

    constructor(options: CommandErrOpt) {
        const defaultMsg = "User don't have the permission to use the command"
        super(options.msg || defaultMsg, options)
        this.defaultMsg= defaultMsg
        this.commandName = options.commandName
        this.userId = options.userId
        this.interaction = options.interaction
    }
}