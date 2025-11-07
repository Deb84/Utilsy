import { CommandInteraction, Interaction } from "discord.js";
import { ShowableErrorOptions } from "./base/ShowableError.ts";
import { ShowableCommandErr } from "./base/ShowableCmdErr.ts";

type CommandErrOpt = ShowableErrorOptions & {
    msg?: string
    commandName: string
    userId: string
    interaction: Interaction
}

export class NoPermissionCmd extends ShowableCommandErr {
    displayedMsg = "You don't have the permission to use this command"
    userOnly = true

    commandName: string
    userId: string
    interaction: Interaction

    constructor(options: CommandErrOpt) {
        super(options.msg || "User don't have the permission to use the command", options)
        this.commandName = options.commandName
        this.userId = options.userId
        this.interaction = options.interaction
    }
}