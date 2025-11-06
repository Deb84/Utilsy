import type { APIApplicationCommand } from "discord.js"
import type { IAccessHandler } from "@/handlers/accessHandler.ts"
import type { ICommandRegistar } from "../../types/ICommandDeclaration.ts"
export type {APIApplicationCommand, IAccessHandler, ICommandRegistar}

export interface IAppCommandGet {
    getAll: (command: ICommandClass) => Promise<Result<APIApplicationCommand| APIApplicationCommand[]>>
    get: (command: ICommandClass) => Promise<Result<APIApplicationCommand | APIApplicationCommand[]>>
}