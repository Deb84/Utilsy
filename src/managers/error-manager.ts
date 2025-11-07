import { ShowableCommandErr } from "@/errors/showable/base/ShowableCmdErr.ts";
import type { IErrorManager, IErrorReplyer } from "./types/IErrorManager.ts";

export class ErrorManager implements IErrorManager {
    constructor(
        private errorReplyer: IErrorReplyer
    ) {}


    async manage(err: Error) {
        if (err instanceof ShowableCommandErr) {
            this.errorReplyer.reply(err)
        }
    }
}