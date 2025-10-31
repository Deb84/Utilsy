import type { Client, ChatInputCommandInteraction } from "discord.js";
import type { IAccessHandler } from "./IAccessHandler.ts";
import type { ICommandsFsUtils } from "../../utils/fsUtils/types/ICommandsFsUtils.ts";
export type {
    IAccessHandler, 
    ICommandsFsUtils, 
    Client, 
    ChatInputCommandInteraction
}

export interface ICommandHandler {
    handle: (commandInteraction: ChatInputCommandInteraction) => Promise<void>
}