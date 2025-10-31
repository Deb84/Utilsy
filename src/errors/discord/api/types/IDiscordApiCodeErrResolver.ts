import { DiscordAPIError } from "discord.js";
export interface IDiscordApiCodeErrResolver {
    resolve(err: unknown): Error;
}

export type ErrorCtor = new (cause: DiscordAPIError, message?: string) => Error;
export type ErrorMap = Record<number, ErrorCtor>;