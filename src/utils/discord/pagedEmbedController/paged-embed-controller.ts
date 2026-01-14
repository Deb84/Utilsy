import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts"
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js"
import type { IPagedEmbedBuilder } from "./types/IPagedEmbedBuilder.ts"


export class PagedEmbedController {
    private pagedEmbedBuilder: IPagedEmbedBuilder | undefined
    private currentPageIndex: number
    private interaction: CommandInteraction | undefined

    constructor(
        private interactionCallbackRegistry: InteractionCallbackRegistry,
        private customIdGenerator: ICustomIdGenerator,
    ) {
        this.pagedEmbedBuilder
        this.currentPageIndex = 0
        this.interaction
    }

    setInteraction(interaction: CommandInteraction) {
        this.interaction = interaction
    }

    setPagedEmbedBuilder(pagedEmbedBuilder: IPagedEmbedBuilder) {
        this.pagedEmbedBuilder = pagedEmbedBuilder
    }

    editMessage(embed: EmbedBuilder) {
        this.interaction?.editReply({embeds: [embed]})
    }

    private createButton(label: string) {
        const customId = this.customIdGenerator.generate()
        console.log(customId)
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
        console.log(this.currentPageIndex)
        if (!this.pagedEmbedBuilder) return

        const nextIndex = this.currentPageIndex + 1
        const pagesLenght = this.pagedEmbedBuilder.getPagesLenght()
        if (pagesLenght && nextIndex >= pagesLenght) null // remove button

        const nextPage = this.pagedEmbedBuilder.getPage(nextIndex)
        const nextPageEmbed = nextPage.getEmbedBuilder()
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

        if (!this.pagedEmbedBuilder) return

        this.interaction?.reply({
            embeds: [this.pagedEmbedBuilder.getPage(this.currentPageIndex).getEmbedBuilder()],
            components: [nextBTN, prevBTN]
        })
    }

}