import { Interaction } from "discord.js"

export type ShowableErrorOptions = {
    result?: Result
    errorOptions?: {cause?: Error}
}


export abstract class ShowableError extends Error {
    abstract defaultMsg: string
    abstract ephermeral: boolean
    abstract interaction: Interaction
    abstract result: Result | undefined

    constructor(msg: string, options?: {
        result?: Result
        errorOptions?: {cause?: Error}
    }) {

        super(msg, options?.errorOptions)

        Object.setPrototypeOf(this, new.target.prototype)
    }
}