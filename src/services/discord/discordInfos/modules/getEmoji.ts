import { UnknownEmoji, UnknownGuild } from "@/errors/discord/discord-errors.ts"
import { Client, GuildEmoji } from "discord.js"
import * as R from 'result'


export default async (client: Client, guildId: string, emojiId: string): Promise<Result<GuildEmoji>> => {
    try {
        const guild = await client.guilds.fetch(guildId)
        if (!guild) return R.err(new UnknownGuild(undefined, {guildId: guildId}))

        const emoji = await guild.emojis.fetch(emojiId)
        if (!emoji) return R.err(new UnknownEmoji(undefined, {emojiId: emojiId}))

        return R.ok(emoji)

    } catch (e) {
        return R.err(e instanceof Error ? e : new Error(String(e)))
    }
}