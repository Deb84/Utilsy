import { IAppCommandGet } from "./ICommandGet.ts";
export {IAppCommandGet}


export interface IAppCommandExists {
    exists: (command: ICommandClass) => Promise<Result<boolean>>
}