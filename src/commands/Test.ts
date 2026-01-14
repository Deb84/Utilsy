import { type CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { Command } from "./types/CommandAb.ts"
import type { IPagedEmbedController } from "@/utils/discord/pagedEmbedController/types/IPagedEmbedController.ts"
import { PagedEmbedBuilder } from "@/utils/discord/pagedEmbedController/paged-embed-builder.ts"
import { PagedEmbedPageBuilder } from "@/utils/discord/pagedEmbedController/paged-embed-page-builder.ts"

export const deps = ['PagedEmbedController']

class Test extends Command {
    static name = 'test'
    static description = 'Fast test command'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = new SlashCommandBuilder()
                    .setName(Test.name)
                    .setDescription(Test.description)


    constructor(
        private pagedEmbedController: IPagedEmbedController
    ) {
        super()
    }


    async execute(interaction: CommandInteraction) {
        const embed1 = new EmbedBuilder().setTitle('1')
        const embed2 = new EmbedBuilder().setTitle('2')

        const pagedEmbedBuild = new PagedEmbedBuilder()
        console.log(pagedEmbedBuild)
        pagedEmbedBuild
            .addPage(new PagedEmbedPageBuilder(embed1))
            .addPage(new PagedEmbedPageBuilder(embed2))

        this.pagedEmbedController.setInteraction(interaction)
        this.pagedEmbedController.setPagedEmbedBuilder(pagedEmbedBuild)
        this.pagedEmbedController.send()
    }
}



export default Test