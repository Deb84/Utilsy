import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts"
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js"
import type { IPagedEmbedController } from "./types/IPagedEmbedController.ts"
import type { IPagedEmbed } from "./types/IPagedEmbed.ts"


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

    private createButton(label: string) {
        const customId = this.customIdGenerator.generate()

        return {btn: 
            new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(customId)
                .setLabel(label)
                .setStyle(ButtonStyle.Primary)
        ),
        id: customId
        }
    }

    next() {
        if (!this.pagedEmbed) return
        
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
        let next = this.createButton('next')
        let prev = this.createButton('previous')
        let nextBTN = next.btn
        let nextCID = next.id
        let prevBTN = prev.btn
        let prevCID = prev.id

        this.interactionCallbackRegistry.register(nextCID, this.next.bind(this))
        this.interactionCallbackRegistry.register(prevCID, this.previous.bind(this))

        if (!this.pagedEmbed) return

        this.interaction?.reply({
            embeds: [this.pagedEmbed.getPage(this.pagedEmbed.getCurrentPageIndex()).getEmbedBuilder()],
            components: [nextBTN, prevBTN]
        })
    }

}