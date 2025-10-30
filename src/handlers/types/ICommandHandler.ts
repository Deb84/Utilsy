import type { Client, ChatInputCommandInteraction } from "discord.js";
export type {Client, ChatInputCommandInteraction}

export interface ICommandHandler {
    handle: (commandInteraction: ChatInputCommandInteraction) => Promise<void>
}