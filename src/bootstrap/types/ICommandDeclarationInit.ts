import { ICommandDeclaration } from "@/services/discord/commandDeclaration/command-declaration.ts";
import { ICommandsFsUtils } from "../../handlers/types/ICommandHandler.ts";
export {ICommandDeclaration, ICommandsFsUtils}

export interface ICommandDeclarationInit {
    declare(): Promise<void>
}