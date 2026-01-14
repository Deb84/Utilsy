import type { IPagedEmbedPageBuilder } from "./IPagedEmbedPageBuilder.ts";

export interface IPagedEmbedBuilder {
    addPage: (page: IPagedEmbedPageBuilder) => IPagedEmbedBuilder
    setPages: (pages: IPagedEmbedPageBuilder[]) => IPagedEmbedBuilder
    getPage: (index: number) => IPagedEmbedPageBuilder
    getPages: () => IPagedEmbedPageBuilder[]
    getPagesLenght: () => number
}