import { EmbedBuilder } from "discord.js";

export interface IEmbedTemplatesBuilder {
    getTemplate: (templateName: string) => Promise<Result<EmbedBuilder>>
    getBase: () => Promise<Result<EmbedBuilder>>
    buildFromTemplate: (templateName: string) => Promise<Result<EmbedBuilder>>
}