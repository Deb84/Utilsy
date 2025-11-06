import { UnknownUser } from "@/errors/discord/discord-errors.ts";
import { Client, User } from "discord.js";
import * as R from 'result'


export default async (client: Client, userId: string): Promise<Result<User>> => {
    try {
        const user = await client.users.fetch(userId)
        if (!user) return R.err(new UnknownUser(undefined, {userId: userId}))
        
        return R.ok(user)
    } catch (e) {
        return R.err(e instanceof Error ? e : new Error(String(e)))
    }
}