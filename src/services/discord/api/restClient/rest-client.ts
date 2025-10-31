import { IRestClient, REST, RouteLike } from "./types/IRestClient.ts"
import * as R from 'result'

export class RestClient implements IRestClient {
    private rest: REST

    constructor(rest: REST) {
        this.rest = rest
    }

    async get<T>(route: RouteLike): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.get(route)
            return R.ok<T>(r as T)
        } catch (e) {
            return R.err(e)
        }
    }

    async post<T>(route: RouteLike, body: unknown): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.post(route, { body }) 
            return R.ok<T>(r as T)
        } catch (e) {
            return R.err(e) 
        }
    }

    async put<T>(route: RouteLike, body: unknown): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.put(route, { body }) 
            return R.ok<T>(r as T)
        } catch (e) {
            return R.err(e)
        }
    }

    async patch<T>(route: RouteLike, body: unknown): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.patch(route, { body }) 
            return R.ok<T>(r as T)
        } catch (e) {
            return R.err(e)
        }
    }
    
    async delete<T>(route: RouteLike): Promise<Result<T, unknown, Error>> {
        try {
            const r = await this.rest.delete(route)
            return R.ok<T>(r as T)
        } catch (e) {
            return R.err(e)
        }
    }
}