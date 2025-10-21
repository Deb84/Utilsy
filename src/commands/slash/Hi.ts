import { CommandInteraction } from "discord.js"


export default async (interaction: CommandInteraction) => {
    await interaction.reply('Hi!') // reply to the interaction msg
}