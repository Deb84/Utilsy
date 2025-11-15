import { ChatInputCommandInteraction, } from "discord.js";
import { ShowableErrorOptions } from "./base/ShowableError.ts";
import { ShowableCommandErr } from "./base/ShowableCmdErr.ts";

type CommandErrOpt = ShowableErrorOptions & {
    msg?: string
    interaction: ChatInputCommandInteraction
    result?: Result
}

type SubCommandName = string | null
type ResultValue = Result | undefined

export class GenericCmdErr extends ShowableCommandErr {
    defaultMsg: string
    ephermeral = true
    subCommandName: SubCommandName
    commandName: string
    userId: string
    interaction: ChatInputCommandInteraction
    result: Result | undefined

    constructor(options: CommandErrOpt) {
        const defaultMsg = "Generic Command Error"
        super(options.msg || defaultMsg, options)
        this.interaction = options.interaction
        this.defaultMsg= defaultMsg
        this.commandName = this.interaction.commandName
        this.subCommandName = this.interaction.options.getSubcommand()
        this.userId = this.interaction.user.id
    }
}

export class NoPermissionCmd extends ShowableCommandErr {
    defaultMsg: string
    ephermeral = true
    subCommandName: SubCommandName
    commandName: string
    userId: string
    interaction: ChatInputCommandInteraction
    result: Result | undefined

    constructor(options: CommandErrOpt) {
        const defaultMsg = "User don't have the permission to use the command"
        super(options.msg || defaultMsg, options)
        this.interaction = options.interaction
        this.defaultMsg= defaultMsg
        this.commandName = this.interaction.commandName
        this.subCommandName = this.interaction.options.getSubcommand(false)
        this.userId = this.interaction.user.id

    }
}