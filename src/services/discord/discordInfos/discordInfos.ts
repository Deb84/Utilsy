import { Client } from "discord.js";
import {
    getChannel as getChannelMod,
    getEmoji as getEmojiMod,
    getGuild as getGuildMod,
    getRole as getRoleMod,
    getUser as getUserMod,
} from "./modules/index.ts";


export class DiscordInfos {
    constructor(private client: Client) {
        this.client = client
    }

    async getChannel(channelId: string) {
        return getChannelMod(this.client, channelId)
    }

    async getEmoji(guildId: string, emojiId: string) {
        return getEmojiMod(this.client, guildId, emojiId)
    }

    async getGuild(guildId: string) {
        return getGuildMod(this.client, guildId)
    }
    async getRole(guildId: string, roleId: string) {
        return getRoleMod(this.client, guildId, roleId)
    }

    async getUser(userId: string) {
        return getUserMod(this.client, userId)
    }
}
