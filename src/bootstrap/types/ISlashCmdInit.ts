import { ICommandDeclaration } from "@/services/discord/commandDeclaration/command-declaration.ts";
import { ICommandsFsUtils } from "../../handlers/types/ICommandHandler.ts";
export {ICommandDeclaration, ICommandsFsUtils}

export interface ISlashCmdInit {
    declare(): Promise<void>
}