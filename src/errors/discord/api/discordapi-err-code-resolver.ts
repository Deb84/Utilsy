import { DiscordAPIError } from 'discord.js';
import { IDiscordApiCodeErrResolver, ErrorMap } from './types/IDiscordApiCodeErrResolver.ts';
import { errorMap } from './discordapi-error-map.ts';


export class DiscordApiCodeErrResolver implements IDiscordApiCodeErrResolver {
    private readonly map: ErrorMap

    constructor() {
        this.map = errorMap
    }

    resolve(err: unknown): Error {
        if (!(err instanceof DiscordAPIError) || typeof err.code !== 'number') {
            return new Error('Unknown error');
        }

        
        const ctor = this.map[err.code];
        return ctor ? new ctor(err, err.message) : new Error('Unknown error');
    }
}
