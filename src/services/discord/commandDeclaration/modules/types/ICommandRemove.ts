import type { APIApplicationCommand } from "discord.js";
import type { ICommandRegistar } from "./ICommandAdd.ts";
import type { IAppCommandGet } from "./ICommandGet.ts";
export type {ICommandRegistar, IAppCommandGet, APIApplicationCommand}



export interface IAppCommandRemove {
    remove: (commandData: CommandData) => Promise<Result>
}