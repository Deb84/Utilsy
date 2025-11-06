import { UnknownGuild } from "@/errors/discord/discord-errors.ts";
import type { Client, Guild } from "discord.js";
import * as R from 'result'


export default async (client: Client, guildId: string): Promise<Result<Guild>> => {
    try {
        const guild = await client.guilds.fetch(guildId)
        if (!guild) return R.err(new UnknownGuild(undefined, {guildId: guildId}))

        return R.ok(guild)
        
    } catch (e) {
        return R.err(e instanceof Error ? e : new Error(String(e)))
    }
}