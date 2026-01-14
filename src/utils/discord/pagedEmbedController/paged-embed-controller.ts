import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts"
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction } from "discord.js"


export class PagedEmbedController {
    private pagedEmbedBuilder:any
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

    setPagedEmbedBuilder(pagedEmbedBuilder: any) {
        this.pagedEmbedBuilder = pagedEmbedBuilder
    }

    editMessage() {
        this.interaction?.editReply({content: 'a'})
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
        console.log('a')
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

        this.interactionCallbackRegistry.register(nextCID, this.next)
        this.interactionCallbackRegistry.register(prevCID, this.previous)

        this.interaction?.reply({
            content: 'test',
            components: [nextBTN, prevBTN]
        })
    }

}