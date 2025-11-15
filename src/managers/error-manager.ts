import { ShowableCommandErr } from "@/errors/showable/base/ShowableCmdErr.ts";
import type { IErrorManager, IErrorReplyer, options } from "./types/IErrorManager.ts";

export class ErrorManager implements IErrorManager {
    constructor(
        private errorReplyer: IErrorReplyer
    ) {}


    async manage(err: Error, options: options = {embed: true}) {
        if (err instanceof ShowableCommandErr) {
            console.log(err)
            options?.embed 
                ? this.errorReplyer.embedReply(err, {defered: options.defered})
                : this.errorReplyer.reply(err, {defered: options?.defered})
        }
    }
}