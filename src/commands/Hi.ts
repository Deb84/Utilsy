import { CommandInteraction, SlashCommandBuilder } from "discord.js"

export const slashCommandBuild = new SlashCommandBuilder()
    .setName('hi')
    .setDescription('Reply Hi!');

export const data = {
    commandType: "guild",
    accessState: "public"
}


export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Hi!'); // reply to the interaction msg
}