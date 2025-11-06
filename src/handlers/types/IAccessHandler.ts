import type { CommandInteraction } from "discord.js";
export type {CommandInteraction}


export interface IAccessHandler {
    hasCommandAccess: (interaction: CommandInteraction, accessLevel: AccessLevel) => Promise<Boolean>
    getCommandAccess: (command: ICommandClass) => Promise<Access | 'public'>
}