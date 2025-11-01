import type { APIApplicationCommand } from "discord.js"
import type { IAccessHandler } from "@/handlers/accessHandler.ts"
import type { ICommandRegistar } from "../../types/ICommandDeclaration.ts"
export type {APIApplicationCommand, IAccessHandler, ICommandRegistar}

export interface IAppCommandGet {
    getAll: (commandData: CommandData) => Promise<Result<APIApplicationCommand| APIApplicationCommand[]>>
    get: (commandData: CommandData) => Promise<Result<APIApplicationCommand | APIApplicationCommand[]>>
}