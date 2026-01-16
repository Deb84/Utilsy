import { ActionRowBuilder, AnyComponentBuilder } from "discord.js"
import type { IPagedEmbed } from "./types/IPagedEmbed.ts"
import type { IPagedEmbedBuilder } from "./types/IPagedEmbedBuilder.ts"
import { ActionRowObj, ComponentBuilderObj } from "./types/types.ts"


export class PagedEmbed implements IPagedEmbed {
    private currentPageIndex: number
    private pagesLength: number
    private components: Map<string, ComponentBuilderObj>
    private actionRows: Map<string, ActionRowObj>

    constructor(
        private pagedEmbedBuilder: IPagedEmbedBuilder
    ) {
        this.currentPageIndex = 0
        this.pagesLength = pagedEmbedBuilder.getPagesLength()
        this.components = new Map()
        this.actionRows = new Map()
    }

    getCurrentPageIndex() {
        return this.currentPageIndex
    }

    setCurrentPageIndex(index: number) {
        this.currentPageIndex = index
        return this
    }

    getPagesLength() {
        return this.pagesLength
    }

    getPage(index: number) {
        return this.pagedEmbedBuilder.getPage(index)
    }

    addComponent(name: string, component: ComponentBuilderObj) {
        this.components.set(name, component)
        return this
    }

    getComponent<T extends ComponentBuilderObj>(name: string) {
        const component = this.components.get(name)
        if (component) return component as T
        throw new Error('component dont exist')
    }

    addActionRow(name: string, actionRow: ActionRowObj) {
        this.actionRows.set(name, actionRow)
        return this
    }

    getActionRow(name: string) {
        const actionRow = this.actionRows.get(name)
        if (actionRow) return actionRow 
        throw new Error('actionRow dont exist')
    }

    getActionsRows() {
        return new Set(this.actionRows.values())
    }

}