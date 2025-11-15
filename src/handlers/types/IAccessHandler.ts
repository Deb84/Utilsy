import type { CommandInteraction } from "discord.js";
export type {CommandInteraction}


export interface IAccessHandler {
    hasCommandAccess: (interaction: CommandInteraction, command: ICommandClass) => Promise<Result<Boolean>>
    resolveCommandAccess: (command: ICommandClass) => Promise<Result<Access | 'public'>>
}