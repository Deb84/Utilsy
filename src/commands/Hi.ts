import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import type { CommandData } from "../types/enums.types.ts";

export const data: CommandData = {
    commandName: 'hi',
    description: 'Reply Hi!',
    commandType: "guild",
    accessLevel: "public"
}

export const slashCommandBuild = new SlashCommandBuilder()
    .setName(data.commandName)
    .setDescription(data.description);


export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Hi!'); // reply to the interaction msg
}