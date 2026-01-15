import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts"
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts"
import { ActionRowBuilder, ActionRowData, AnyComponentBuilder, APIActionRowComponent, APIButtonComponentWithCustomId, APIComponentInActionRow, ButtonBuilder, ButtonComponentData, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js"
import type { IPagedEmbedController } from "./types/IPagedEmbedController.ts"
import type { IPagedEmbed } from "./types/IPagedEmbed.ts"
import { createButton } from "./utils/create-button.ts"
import { createActionRow } from "./utils/create-actionRow.ts"
import { ButtonComponentObj } from "./types/types.ts"


export class PagedEmbedController implements IPagedEmbedController {

    constructor(
        private interactionCallbackRegistry: InteractionCallbackRegistry,
        private customIdGenerator: ICustomIdGenerator,
        private interaction: CommandInteraction,
        private pagedEmbed: IPagedEmbed
    ) {
        this.interaction
    }

    private editMessage(settings: {embed?: EmbedBuilder[], actionRow?: ActionRowBuilder[]}) {
        const payload: {embeds?: EmbedBuilder[], components?: APIActionRowComponent<APIComponentInActionRow>[]} = {}

        if (settings.embed) payload.embeds = settings.embed
        if (settings.actionRow) payload.components = settings.actionRow.map((e) => e.toJSON())
        console.log('message edited')
        console.log(settings.actionRow)

        this.interaction?.editReply(payload)
    }

    private disableButton(ref: string) {
        console.log('ici')
        const button = this.pagedEmbed.getComponent<ButtonComponentObj>(ref)
        button.component.setDisabled(true)
        this.pagedEmbed.addComponent(button.ref, button)
        const actionRow = this.pagedEmbed.getActionRow('navigation')

        actionRow.actionRow.setComponents(actionRow.actionRow.components.filter((c): c is ButtonBuilder => 'custom_id' in c.data && c.data.custom_id  !== button.id))
        actionRow.actionRow.addComponents(button.component)
        this.pagedEmbed.addActionRow('navigation', actionRow)
        console.log(actionRow.actionRow.components)
        return actionRow
    }

    next() {
        const currentPageIndex = this.pagedEmbed.getCurrentPageIndex()

        const nextIndex = currentPageIndex + 1
        const pagesLength = this.pagedEmbed.getPagesLength()
        let editMessage: Callback<void> | undefined

        console.log(pagesLength)
        console.log(nextIndex)
        console.log(currentPageIndex)

        const nextPage = this.pagedEmbed.getPage(nextIndex)
        const nextPageEmbed = nextPage.getEmbedBuilder()

        if (nextIndex >= pagesLength -1) {
            const actionRow = this.disableButton('next')
            console.log(actionRow.actionRow)
            editMessage = this.editMessage.bind(this, {embed: [nextPageEmbed], actionRow: [actionRow.actionRow]})}

        this.pagedEmbed.setCurrentPageIndex(nextIndex)

        

        if (!editMessage) editMessage = this.editMessage.bind(this, {embed: [nextPageEmbed]})

        editMessage()

    }

    previous() {
        const currentPageIndex = this.pagedEmbed.getCurrentPageIndex()

        const previousIndex = currentPageIndex - 1
        const pagesLength = this.pagedEmbed.getPagesLength()

        const previousPage = this.pagedEmbed.getPage(previousIndex)
        const previousPageEmbed = previousPage.getEmbedBuilder()

        this.pagedEmbed.setCurrentPageIndex(previousIndex)

        this.editMessage({embed: [previousPageEmbed]})
    }

    init() {
        let next = createButton(this.customIdGenerator, 'next', 'next')
        let prev = createButton(this.customIdGenerator, 'previous', 'prev')
        let navigation = createActionRow('navigation')

        navigation.actionRow.addComponents([next.component, prev.component])

        this.pagedEmbed
            .addComponent(next.ref, next)
            .addComponent(prev.ref, prev)
            .addActionRow(navigation.ref, navigation)


        this.interactionCallbackRegistry.register(next.id, this.next.bind(this))
        this.interactionCallbackRegistry.register(prev.id, this.previous.bind(this))

        this.interaction?.reply({
            embeds: [this.pagedEmbed.getPage(this.pagedEmbed.getCurrentPageIndex()).getEmbedBuilder()],
            components: [navigation.actionRow.toJSON()]
        })
    }

}