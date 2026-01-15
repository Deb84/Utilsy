import type { CommandInteraction } from "discord.js";
import { PagedEmbedController } from "./paged-embed-controller.ts";
import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts";
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/customId-generator.ts";
import { PagedEmbed } from "./paged-embed.ts";
import  type { IPagedEmbedBuilder } from "./types/IPagedEmbedBuilder.ts";


export class PagedEmbedFactory {
    constructor(
        private interactionCallbackRegistry: InteractionCallbackRegistry,
        private customIdGenerator: ICustomIdGenerator
    ) {}

    private createPagedEmbed(pagedEmbedBuilder: IPagedEmbedBuilder) {
        return new PagedEmbed(pagedEmbedBuilder)
    }

    create(interaction: CommandInteraction, pagedEmbedBuilder: IPagedEmbedBuilder) {
        return new PagedEmbedController(
            this.interactionCallbackRegistry, 
            this.customIdGenerator, 
            interaction,
            this.createPagedEmbed(pagedEmbedBuilder)
        )
    }
}