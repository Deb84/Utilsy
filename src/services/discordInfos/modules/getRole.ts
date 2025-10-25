import { Client } from "discord.js";


export default async (client: Client, guildId: string, roleId: string) => {
    const guild = await client.guilds.fetch(guildId) 
    return guild.roles.fetch(roleId)
}