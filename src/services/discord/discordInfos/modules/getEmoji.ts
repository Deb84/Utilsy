import { Client } from "discord.js"


export default async (client: Client, guildId: string, emojiId: string) => {
    const guild = await client.guilds.fetch(guildId)
    return guild.emojis.fetch(emojiId)
}