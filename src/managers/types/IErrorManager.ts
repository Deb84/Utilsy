import type { IErrorReplyer } from "@/services/discord/errorReplyer/types/IErrorReplyer.ts";
export type {IErrorReplyer}

export interface IErrorManager {
    manage: (err: Error) => Promise<void>
}