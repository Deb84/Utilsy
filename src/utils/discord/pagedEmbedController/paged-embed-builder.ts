import { IPagedEmbedBuilder } from "./types/IPagedEmbedBuilder.ts"
import type { IPagedEmbedPageBuilder } from "./types/IPagedEmbedPageBuilder.ts"


export class PagedEmbedBuilder implements IPagedEmbedBuilder {
    private pages: IPagedEmbedPageBuilder[]

    constructor() {
        this.pages = []
    }

    addPage(page: IPagedEmbedPageBuilder) {
        this.pages.push(page)
        const index = page.getIndex()
        if (!index) page.setIndex(this.pages.indexOf(page))
        return this
    }

    setPages(pages: IPagedEmbedPageBuilder[]) {
        this.pages = pages
        return this
    }

    getPage(index: number) {
        return this.pages[index]
    }

    getPages() {
        return this.pages
    }

    getPagesLenght() {
        return this.pages.length
    }

}