import type { IPagedEmbedPageBuilder } from "./IPagedEmbedPageBuilder.ts"

export interface IPagedEmbed {
    getCurrentPageIndex: () => number
    setCurrentPageIndex: (index: number) => void
    getPagesLength: () => number
    getPage: (index: number) => IPagedEmbedPageBuilder
}