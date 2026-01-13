import type { ChatInputCommandInteraction } from "discord.js";
import type { Container } from "inversify";
import type { IAccessHandler } from "./IAccessHandler.ts";
import type { ICommandsFsUtils } from "@/utils/fsUtils/types/ICommandsFsUtils.ts";
import type { IErrorManager } from "@/managers/types/IErrorManager.ts";
export type {
    IAccessHandler, 
    ICommandsFsUtils,
    IErrorManager,
    ChatInputCommandInteraction,
    Container
}

export interface ICommandHandler {
    handle: (commandInteraction: ChatInputCommandInteraction) => Promise<void>
}