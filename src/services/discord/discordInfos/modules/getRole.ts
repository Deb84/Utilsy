import { UnknownGuild, UnknownRole } from "@/errors/discord/discord-errors.ts";
import { Client, Role } from "discord.js";
import * as R from 'result'


export default async (client: Client, guildId: string, roleId: string): Promise<Result<Role>> => {
    try {
        const guild = await client.guilds.fetch(guildId)
        if (!guild) return R.err(new UnknownGuild(undefined, {guildId: guildId}))
        
        const role = await guild.roles.fetch(roleId)
        if (!role) return R.err(new UnknownRole(undefined, {roleId: roleId}))

        return R.ok(role)

    } catch (e) {
        return R.err(e instanceof Error ? e : new Error(String(e)))
    }
}