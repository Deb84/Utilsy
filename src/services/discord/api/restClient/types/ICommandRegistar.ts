import { APIApplicationCommand } from "discord.js";
import type { IRestClient } from "./IRestClient.ts";
export type {IRestClient}

export interface ICommandRegistar {
    registerGlobal: (commandJson: unknown) => Promise<Result>
    registerGuild: (commandJson: unknown, guildId: string) => Promise<Result>

    removeGlobal: (commandId: string) => Promise<Result>
    removeGuild: (guildId: string, commandId: string) => Promise<Result>

    updateGlobal: (commandJson: unknown, commandId: string) => Promise<Result>
    updateGuild: (commandJson: unknown, guildId: string, commandId: string) => Promise<Result>

    getGlobal: (commandId: string) => Promise<Result<APIApplicationCommand>>
    getGuild: (guildId: string, commandId: string) => Promise<Result<APIApplicationCommand>>
    getGlobalAll: () => Promise<Result<APIApplicationCommand[]>>
    getGuildAll: (guildId: string) => Promise<Result<APIApplicationCommand[]>>
}