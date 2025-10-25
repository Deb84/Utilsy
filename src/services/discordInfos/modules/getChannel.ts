import { Client } from "discord.js";

export default async (client: Client, channelId: string) => {
    return await client.channels.fetch(channelId, {allowUnknownGuild: true})
}