import type { EmbedBuilder } from "discord.js";
import type { IPagedEmbedPageBuilder } from "./types/IPagedEmbedPageBuilder.ts";

type settings = {
    index?: number
}

export class PagedEmbedPageBuilder implements IPagedEmbedPageBuilder {
    private index: number | undefined

    constructor(private embedBuilder: EmbedBuilder, private settings?: settings) 
    {
        this.index = settings?.index
    }

    setIndex(index: number) {
        return this.index = index
    }

    getIndex() {
        return this.index
    }

    getEmbedBuilder() {
        return this.embedBuilder
    }
}