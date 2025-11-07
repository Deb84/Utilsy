import { Interaction } from "discord.js"

export type ShowableErrorOptions = {
    result?: Result
    errorOptions?: {cause?: Error}
}


export abstract class ShowableError extends Error {
    abstract displayedMsg: string
    abstract userOnly: boolean
    abstract interaction: Interaction

    constructor(msg: string, options?: {
        result?: Result
        errorOptions?: {cause?: Error}
    }) {

        super(msg, options?.errorOptions)

        Object.setPrototypeOf(this, new.target.prototype)
    }
}