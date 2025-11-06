import type {APIApplicationCommand } from "discord.js";
import type { ICommandRegistar } from "../../api/restClient/types/ICommandRegistar.ts";
import type { IAccessHandler } from "../../../../handlers/types/IAccessHandler.ts";
export type {ICommandRegistar, IAccessHandler}

export interface ICommandDeclaration {
  add: (command: ICommandClass) => Promise<Result>
  remove: (command: ICommandClass) => Promise<Result>
  get: (command: ICommandClass) => Promise<
    Result<APIApplicationCommand | (APIApplicationCommand | undefined)[] | undefined>
  >
  exists: (command: ICommandClass) => Promise<Result<boolean>>
}
