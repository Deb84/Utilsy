import type { APIApplicationCommand, REST } from "discord.js";
export type {REST}


export interface ISlashDeclaration {
    add: (commandData: CommandData) => Promise<void>
    remove: (commandData: CommandData) => Promise<void>
    get: (commandData: CommandData) => Promise<APIApplicationCommand | (APIApplicationCommand | undefined)[] | undefined>
    exists: (commandData: CommandData) => Promise<boolean>
}