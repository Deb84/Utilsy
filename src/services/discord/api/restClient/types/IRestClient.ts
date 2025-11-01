import type { DiscordAPIError, REST, RouteLike } from "discord.js";
import type { IDiscordApiCodeErrResolver } from "@/errors/discord/api/types/IDiscordApiCodeErrResolver.ts";
export type {REST, RouteLike, DiscordAPIError, IDiscordApiCodeErrResolver}


export interface IRestClient {
    get: <T>(route: RouteLike) => Promise<Result<T, unknown, Error>>
    post: <T>(route: RouteLike, body: unknown) => Promise<Result<T, unknown, Error>>
    put: <T>(route: RouteLike, body: unknown) => Promise<Result<T, unknown, Error>>
    patch: <T>(route: RouteLike, body: unknown) => Promise<Result<T, unknown, Error>>
    delete: <T>(route: RouteLike) => Promise<Result<T, unknown, Error>>
} 