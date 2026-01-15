import { EmbedBuilder } from "discord.js"

export interface IPagedEmbedPageBuilder {
    setIndex: (index: number) => void
    getIndex: () => number | undefined
    getEmbedBuilder: () => EmbedBuilder
}