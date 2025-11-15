import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import { Command } from "./types/CommandAb.ts"


class Bye extends Command {
    static name = 'bye'
    static description = 'Reply bye!'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = new SlashCommandBuilder()
                    .setName(Bye.name)
                    .setDescription(Bye.description)


    async execute(interaction: CommandInteraction) {
        await interaction.reply('Bye!'); // reply to the interaction msg
    }
}



export default Bye