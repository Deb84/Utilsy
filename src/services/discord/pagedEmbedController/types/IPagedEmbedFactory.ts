import type { CommandInteraction } from "discord.js";
import  type { IPagedEmbedController } from "./IPagedEmbedController.ts";
import type { IPagedEmbedBuilder } from "./IPagedEmbedBuilder.ts";

export interface IPagedEmbedFactory {
    create: (interaction: CommandInteraction, pagedEmbedBuilder: IPagedEmbedBuilder) => IPagedEmbedController
}