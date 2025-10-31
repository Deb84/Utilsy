import type { REST, APIApplicationCommand } from "discord.js";
import type { IAccessHandler } from "../../../../handlers/types/IAccessHandler.ts";
export type {REST, IAccessHandler}

export interface ICommandDeclaration {
  add: (commandData: CommandData) => Promise<Result<void>>
  remove: (commandData: CommandData) => Promise<Result<void>>
  get: (commandData: CommandData) => Promise<
    Result<APIApplicationCommand | (APIApplicationCommand | undefined)[] | undefined>
  >
  exists: (commandData: CommandData) => Promise<Result<void>>
}
