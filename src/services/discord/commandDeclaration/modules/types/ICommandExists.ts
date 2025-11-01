import { IAppCommandGet } from "./ICommandGet.ts";
export {IAppCommandGet}


export interface IAppCommandExists {
    exists: (commandData: CommandData) => Promise<Result<boolean>>
}