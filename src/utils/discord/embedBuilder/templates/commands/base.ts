import { EmbedBuilder } from "discord.js"


export async function getEmbed(config: BotConfig) {
    const { mainColor, botName } = await config.globalConfig()


    const embed = new EmbedBuilder()
        .setColor(mainColor)
        .setFooter({text: botName})



    return embed
}