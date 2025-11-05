import type { Client } from "discord.js";
export type {Client}


export interface IDiscordInfos {
    getChannel: (channelId: string) => Promise<Result>
    getEmoji: (emojiId: string) => Promise<Result>
    getGuild: (guildId: string) => Promise<Result>
    getRole: (roleId: string) => Promise<Result>
    getUser: (userId: string) => Promise<Result>
}