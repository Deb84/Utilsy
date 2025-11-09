import type { Channel, Client, Emoji, Guild, Role, User } from "discord.js";
export type {Client}


export interface IDiscordInfos {
    getChannel: (channelId: string) => Promise<Result<Channel>>
    getEmoji: (emojiId: string) => Promise<Result<Emoji>>
    getGuild: (guildId: string) => Promise<Result<Guild>>
    getRole: (roleId: string) => Promise<Result<Role>>
    getUser: (userId: string) => Promise<Result<User>>
}