import { UnknownChannel } from "@/errors/discord//discord-errors.ts";
import { Channel, Client } from "discord.js";
import * as R from 'result'

export default async (client: Client, channelId: string): Promise<Result<Channel>> => {
    try {
        const result = await client.channels.fetch(channelId, {allowUnknownGuild: true})
        if (result) return R.ok(result)
        return R.err(new UnknownChannel(undefined, {channelId: channelId}))
    } catch (e) {
        return R.err(e instanceof Error ? e : new Error(String(e)))
    }
}