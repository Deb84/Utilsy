import { Client, ChatInputCommandInteraction } from "discord.js";
export {Client, ChatInputCommandInteraction}

export interface ICommandHandler {
    handle: (commandInteraction: ChatInputCommandInteraction) => Promise<void>
}