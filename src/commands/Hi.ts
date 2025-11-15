import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import { Command } from "./types/CommandAb.ts"

class Hi extends Command {
    static name = 'hi'
    static description = 'Reply Hi!'
    static commandType: CommandType = 'global'
    static accessLevel: AccessLevel = 'test'
    static slashCommandBuilder = new SlashCommandBuilder()
                    .setName(Hi.name)
                    .setDescription(Hi.description)


    async execute(interaction: CommandInteraction) {
        await interaction.reply('Hi!'); // reply to the interaction msg
    }
}



export default Hi