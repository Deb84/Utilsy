import { ActionRowBuilder, AnyComponentBuilder } from "discord.js"
import type { IPagedEmbedPageBuilder } from "./IPagedEmbedPageBuilder.ts"
import { ActionRowObj, ComponentBuilderObj } from "./types.ts"

export interface IPagedEmbed {
    getCurrentPageIndex: () => number
    setCurrentPageIndex: (index: number) => IPagedEmbed
    getPagesLength: () => number
    getPage: (index: number) => IPagedEmbedPageBuilder
    addComponent: (name: string, component: ComponentBuilderObj) => IPagedEmbed
    getComponent<T extends ComponentBuilderObj>(name: string): T
    addActionRow: (name: string, actionRow: ActionRowObj) => IPagedEmbed
    getActionRow: (name: string) => ActionRowObj
}