import type { DiscordAPIError, REST, RouteLike } from "discord.js";
export {REST, RouteLike, DiscordAPIError}


export interface IRestClient {
    get: <T>(route: RouteLike) => Promise<Result<T, unknown, Error>>
    post: <T>(route: RouteLike, body: unknown) => Promise<Result<T, unknown, Error>>
    put: <T>(route: RouteLike, body: unknown) => Promise<Result<T, unknown, Error>>
    patch: <T>(route: RouteLike, body: unknown) => Promise<Result<T, unknown, Error>>
    delete: <T>(route: RouteLike) => Promise<Result<T, unknown, Error>>
}