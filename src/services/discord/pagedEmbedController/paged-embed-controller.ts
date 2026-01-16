import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts"
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts"
import { ActionRowBuilder, ActionRowData, AnyComponentBuilder, APIActionRowComponent, APIBaseComponent, APIButtonBase, APIButtonComponentWithCustomId, APIComponentInActionRow, ButtonBuilder, ButtonComponentData, ButtonStyle, CommandInteraction, Component, EmbedBuilder } from "discord.js"
import type { IPagedEmbedController } from "./types/IPagedEmbedController.ts"
import type { IPagedEmbed } from "./types/IPagedEmbed.ts"
import { createButton } from "./utils/create-button.ts"
import { createActionRow } from "./utils/create-actionRow.ts"
import { ButtonComponentObj, ButtonDataWithDisabled } from "./types/types.ts"


export class PagedEmbedController implements IPagedEmbedController {

    constructor(
        private interactionCallbackRegistry: InteractionCallbackRegistry,
        private customIdGenerator: ICustomIdGenerator,
        private interaction: CommandInteraction,
        private pagedEmbed: IPagedEmbed
    ) {
        this.interaction
    }

    private displayMessage() {
        const payload: {embeds?: EmbedBuilder[], components?: APIActionRowComponent<APIComponentInActionRow>[]} = {}

        payload.embeds = [this.pagedEmbed.getPage(
            this.pagedEmbed.getCurrentPageIndex()
        ).getEmbedBuilder()]
        payload.components = [...this.pagedEmbed.getActionsRows()].map(v => v.actionRow.toJSON())

        this.interaction?.editReply(payload)
    }

    private changeDisableState(ref: string, disabled: boolean) {
        const button = this.pagedEmbed.getComponent<ButtonComponentObj>(ref)
        button.component.setDisabled(disabled)

        this.pagedEmbed.addComponent(button.ref, button)
        const actionRow = this.pagedEmbed.getActionRow('navigation')

        actionRow.actionRow.setComponents(actionRow.actionRow.components.filter((c): c is ButtonBuilder => 'custom_id' in c.data && c.data.custom_id  !== button.id))
        actionRow.actionRow.addComponents(button.component)
        this.pagedEmbed.addActionRow('navigation', actionRow)
    }

    private isDisabled(componentRef: string) {
        return (this.pagedEmbed.getComponent(componentRef).component.data as ButtonDataWithDisabled).disabled === true
    }

    private updateDisableState() {
        const currentPageIndex = this.pagedEmbed.getCurrentPageIndex()
        const pagesLength = this.pagedEmbed.getPagesLength()

        if (currentPageIndex >= pagesLength -1) {
            // next
            console.log(`blocage de next, currentPageIndex:${currentPageIndex}, pagesLength:${pagesLength}`)
            this.changeDisableState('next', true)
        } else if (currentPageIndex <= 0) {
            // previous
            console.log(`blocage de prev, currentPageIndex:${currentPageIndex}, pagesLength:${pagesLength}`)
            this.changeDisableState('prev', true)
        } else {
            if (this.isDisabled('next')) this.changeDisableState('next', false)
            if (this.isDisabled('prev')) this.changeDisableState('prev', false)
        }
    }

    next() {
        const currentPageIndex = this.pagedEmbed.getCurrentPageIndex()

        const nextIndex = currentPageIndex + 1


        this.pagedEmbed.setCurrentPageIndex(nextIndex)

        this.updateDisableState()

        this.displayMessage()
    }

    previous() {
        const currentPageIndex = this.pagedEmbed.getCurrentPageIndex()

        const previousIndex = currentPageIndex - 1

        this.pagedEmbed.setCurrentPageIndex(previousIndex)

        this.updateDisableState()

        this.displayMessage()
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

        this.updateDisableState()

        this.interaction?.reply({
            embeds: [this.pagedEmbed.getPage(this.pagedEmbed.getCurrentPageIndex()).getEmbedBuilder()],
            components: [navigation.actionRow.toJSON()]
        })
    }

}