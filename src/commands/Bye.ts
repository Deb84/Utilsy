import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import type { Command } from "../types/enums.types.ts";

async function execute(interaction: CommandInteraction) {
    await interaction.reply('Hi!'); // reply to the interaction msg
}

const name = 'bye'
const description = 'Reply Bye!'

const command: Command = {
    data: {
        commandName: name,
        description: description,
        commandType: "guild",
        accessLevel: "test",
        slashCommandBuild: new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)
    },
    execute
}

export default command;