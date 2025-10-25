import { Client } from "discord.js";


export default async (client: Client, userId: string) => {
    return await client.users.fetch(userId)
}