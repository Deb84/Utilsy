import type { IRestClient, REST, RouteLike, IDiscordApiCodeErrResolver } from "./types/IRestClient.ts"
import * as R from 'result'
export type {IRestClient}

export class RestClient implements IRestClient {
    constructor(
        private rest: REST,
        private errorResolver: IDiscordApiCodeErrResolver
    ){}

    async get<T>(route: RouteLike): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.get(route)
            return R.ok<T>(r as T)
        } catch (e) {
            const err = this.errorResolver.resolve(e)
            return R.err(err)
        }
    }

    async post<T>(route: RouteLike, body: unknown): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.post(route, { body }) 
            return R.ok<T>(r as T)
        } catch (e) {
            const err = this.errorResolver.resolve(e)
            return R.err(err) 
        }
    }

    async put<T>(route: RouteLike, body: unknown): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.put(route, { body }) 
            return R.ok<T>(r as T)
        } catch (e) {
            const err = this.errorResolver.resolve(e)
            return R.err(err)
        }
    }

    async patch<T>(route: RouteLike, body: unknown): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.patch(route, { body }) 
            return R.ok<T>(r as T)
        } catch (e) {
            const err = this.errorResolver.resolve(e)
            return R.err(err)
        }
    }
    
    async delete<T>(route: RouteLike): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.delete(route)
            return R.ok<T>(r as T)
        } catch (e) {
            const err = this.errorResolver.resolve(e)
            return R.err(err)
        }
    }
}