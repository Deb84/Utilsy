import { Interaction } from "discord.js"


class PagedEmbedController {
    private pages: any[]

    constructor() {
        this.pages = []
    }

    addPage(page: any) {
        this.pages.push(page)
    }

    setPage(pages: any[]) {
        this.pages = pages
    }

}