import { type CommandInteraction, SlashCommandBuilder } from "discord.js"
import { Command } from "./types/CommandAb.ts"
import type { IPagedEmbedController } from "@/utils/discord/pagedEmbedController/types/IPagedEmbedController.ts"

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
        this.pagedEmbedController.setInteraction(interaction)
        this.pagedEmbedController.send()
    }
}



export default Test