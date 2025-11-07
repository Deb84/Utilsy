import { EmbedBuilder } from "discord.js"

export async function getEmbed(config: BotConfig) {
    const { botName, author } = await config.globalConfig()


    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Error')
        .setAuthor({name: author})
        .setFooter({text: botName})



    return embed
}