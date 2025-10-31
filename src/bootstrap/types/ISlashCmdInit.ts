import { ISlashDeclaration } from "../../services/slashCmdDeclaration/types/ISlashCmdDeclaration.ts";
import { ICommandsFsUtils } from "../../handlers/types/ICommandHandler.ts";
export {ISlashDeclaration, ICommandsFsUtils}

export interface ISlashCmdInit {
    declare(): Promise<void>
}