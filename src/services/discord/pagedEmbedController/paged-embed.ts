import type { IPagedEmbed } from "./types/IPagedEmbed.ts"
import type { IPagedEmbedBuilder } from "./types/IPagedEmbedBuilder.ts"


export class PagedEmbed implements IPagedEmbed {
    private currentPageIndex: number
    private pagesLength: number

    constructor(
        private pagedEmbedBuilder: IPagedEmbedBuilder
    ) {
        this.currentPageIndex = 0
        this.pagesLength = pagedEmbedBuilder.getPagesLength()
    }

    getCurrentPageIndex() {
        return this.currentPageIndex
    }

    setCurrentPageIndex(index: number) {
        this.currentPageIndex = index
    }

    getPagesLength() {
        return this.pagesLength
    }

    getPage(index: number) {
        return this.pagedEmbedBuilder.getPage(index)
    }

}