import { EmbedBuilder } from "discord.js";

export interface IEmbedTemplate {
    getEmbed: <T extends any[]>(...args: T) => Promise<EmbedBuilder>
}