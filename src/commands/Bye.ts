import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import { Command } from "./types/CommandAb.ts"

/* async function execute(interaction: CommandInteraction) {
    await interaction.reply('Bye!'); // reply to the interaction msg
} */

class cmdBye extends Command {
    static name = 'bye'
    static description = 'Reply bye!'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = new SlashCommandBuilder()
                    .setName(this.name)
                    .setDescription(this.description)


    async execute(interaction: CommandInteraction) {
        await interaction.reply('Bye!'); // reply to the interaction msg
    }
}



export default cmdBye