import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import type { Command } from "../types/enums.types.ts";

async function execute(interaction: CommandInteraction) {
    await interaction.reply('Hi!'); // reply to the interaction msg
}

const command: Command = {
    data: {
        commandName: 'hi',
        description: 'Reply Hi!',
        commandType: "guild",
        accessLevel: "private",
        slashCommandBuild: new SlashCommandBuilder()
            .setName('hi')
            .setDescription('Reply Hi!')
    },
    execute
}

export default command;