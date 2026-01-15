import { type CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { Command } from "./types/CommandAb.ts"
import type { IPagedEmbedController } from "@/services/discord/pagedEmbedController/types/IPagedEmbedController.ts"
import { PagedEmbedBuilder } from "@/services/discord/pagedEmbedController/paged-embed-builder.ts"
import { PagedEmbedPageBuilder } from "@/services/discord/pagedEmbedController/paged-embed-page-builder.ts"
import type { IPagedEmbedFactory } from "@/services/discord/pagedEmbedController/types/IPagedEmbedFactory.ts"

export const deps = ['PagedEmbedFactory']

class Test extends Command {
    static name = 'test'
    static description = 'Fast test command'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = new SlashCommandBuilder()
                    .setName(Test.name)
                    .setDescription(Test.description)


    constructor(
        private pagedEmbedFactory: IPagedEmbedFactory
    ) {
        super()
    }


    async execute(interaction: CommandInteraction) {
        const embed1 = new EmbedBuilder().setTitle('1')
        const embed2 = new EmbedBuilder().setTitle('2')
        const embed3 = new EmbedBuilder().setTitle('3')

        const pagedEmbedBuild = new PagedEmbedBuilder()
        pagedEmbedBuild
            .addPage(new PagedEmbedPageBuilder(embed1))
            .addPage(new PagedEmbedPageBuilder(embed2))
            .addPage(new PagedEmbedPageBuilder(embed3))
       
        const pagedEmbedController = this.pagedEmbedFactory.create(interaction, pagedEmbedBuild)

        pagedEmbedController.send()
    }
}



export default Test