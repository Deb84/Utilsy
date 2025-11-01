import type { IAccessHandler } from "@/handlers/accessHandler.ts";
import type { ICommandRegistar } from "../../types/ICommandDeclaration.ts";
export {IAccessHandler, ICommandRegistar}

export interface IAppCommandAdd {
    add: (commandData: CommandData) => Promise<Result>
}