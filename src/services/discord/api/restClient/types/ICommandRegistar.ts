import { ApplicationCommand } from "discord.js";
import type { IRestClient } from "./IRestClient.ts";
export type {IRestClient}

export interface ICommandRegistar {
    registerGlobal: (commandJson: unknown) => Promise<Result>
    registerGuild: (commandJson: unknown, guildId: string) => Promise<Result>

    removeGlobal: (commandId: string) => Promise<Result>
    removeGuild: (guildId: string, commandId: string) => Promise<Result>

    updateGlobal: (commandJson: unknown, commandId: string) => Promise<Result>
    updateGuild: (commandJson: unknown, guildId: string, commandId: string) => Promise<Result>

    getGlobal: (commandId: string) => Promise<Result<ApplicationCommand>>
    getGuild: (guildId: string, commandId: string) => Promise<Result<ApplicationCommand>>
    getGlobalAll: () => Promise<Result<ApplicationCommand[]>>
    getGuildAll: (guildId: string) => Promise<Result<ApplicationCommand[]>>
}