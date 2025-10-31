import type { CommandInteraction } from "discord.js";
export type {CommandInteraction}


export interface IAccessHandler {
    hasCommandAccess: (interaction: CommandInteraction, accessLevel: AccessLevel) => Promise<Boolean>
    getCommandAccess: (commandData: CommandData) => Promise<Access | 'public'>
}