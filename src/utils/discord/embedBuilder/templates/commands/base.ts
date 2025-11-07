import { EmbedBuilder } from "discord.js"

export async function getEmbed(config: BotConfig) {
    const { mainColor, botName, author } = await config.globalConfig()


    const embed = new EmbedBuilder()
        .setColor(mainColor)
        .setAuthor({name: author})
        .setFooter({text: botName})



    return embed
}