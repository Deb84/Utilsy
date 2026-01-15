import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts"
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js"
import type { IPagedEmbedController } from "./types/IPagedEmbedController.ts"
import type { IPagedEmbed } from "./types/IPagedEmbed.ts"
import { createButton } from "./utils/create-button.ts"


export class PagedEmbedController implements IPagedEmbedController {

    constructor(
        private interactionCallbackRegistry: InteractionCallbackRegistry,
        private customIdGenerator: ICustomIdGenerator,
        private interaction: CommandInteraction,
        private pagedEmbed: IPagedEmbed
    ) {
        this.interaction
    }

    editMessage(embed: EmbedBuilder) {
        this.interaction?.editReply({embeds: [embed]})
    }

    next() {
        const currentPageIndex = this.pagedEmbed.getCurrentPageIndex()

        const nextIndex = currentPageIndex + 1
        const pagesLenght = this.pagedEmbed.getPagesLength()
        if (pagesLenght && nextIndex >= pagesLenght) null // remove button

        const nextPage = this.pagedEmbed.getPage(nextIndex)
        const nextPageEmbed = nextPage.getEmbedBuilder()

        this.pagedEmbed.setCurrentPageIndex(nextIndex)

        this.editMessage(nextPageEmbed)

    }

    previous() {
        console.log('b')
    }

    send() {
        let next = createButton(this.customIdGenerator, 'next')
        let prev = createButton(this.customIdGenerator, 'previous')

        this.interactionCallbackRegistry.register(next.id, this.next.bind(this))
        this.interactionCallbackRegistry.register(prev.id, this.previous.bind(this))

        this.interaction?.reply({
            embeds: [this.pagedEmbed.getPage(this.pagedEmbed.getCurrentPageIndex()).getEmbedBuilder()],
            components: [next.btn, prev.btn]
        })
    }

}