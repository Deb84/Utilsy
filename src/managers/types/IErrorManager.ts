import type { IErrorReplyer } from "@/services/discord/errorReplyer/types/IErrorReplyer.ts";
export type {IErrorReplyer}

export type options = {
    embed?: boolean
    defered?: boolean
}

export interface IErrorManager {
    manage: (err: Error, options?: options) => Promise<void>
}