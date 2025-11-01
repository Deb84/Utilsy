import type {APIApplicationCommand } from "discord.js";
import type { ICommandRegistar } from "../../api/restClient/types/ICommandRegistar.ts";
import type { IAccessHandler } from "../../../../handlers/types/IAccessHandler.ts";
export type {ICommandRegistar, IAccessHandler}

export interface ICommandDeclaration {
  add: (commandData: CommandData) => Promise<Result>
  remove: (commandData: CommandData) => Promise<Result>
  get: (commandData: CommandData) => Promise<
    Result<APIApplicationCommand | (APIApplicationCommand | undefined)[] | undefined>
  >
  exists: (commandData: CommandData) => Promise<Result<boolean>>
}
