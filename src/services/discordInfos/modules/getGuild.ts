import { Client } from "discord.js";


export default async (client: Client, guildId: string) => {
    return await client.guilds.fetch(guildId)
}