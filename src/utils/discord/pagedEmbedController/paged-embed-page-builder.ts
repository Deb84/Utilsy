import { EmbedBuilder } from "@discordjs/builders";

class PagedEmbedPageBuilder {

    constructor(private embedBuilder: EmbedBuilder, private index: number) {
    }
}