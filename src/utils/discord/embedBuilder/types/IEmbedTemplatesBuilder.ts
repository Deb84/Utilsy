import { EmbedBuilder } from "discord.js";
import { IEmbedTemplate } from "./IEmbedTemplate.ts";

export interface IEmbedTemplatesBuilder {
    getTemplate: (templateName: string) => Promise<Result<IEmbedTemplate>>
    getBase: () => Promise<Result<EmbedBuilder>>
    buildFromTemplate: (templateName: string) => Promise<Result<EmbedBuilder>>
}