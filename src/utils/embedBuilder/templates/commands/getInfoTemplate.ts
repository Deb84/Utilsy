import { EmbedBuilder } from "discord.js"
import { config } from "../../../../config/index.ts"

export const keys = ['id', 'username', 'globalName']

export async function getEmbed() {
    const { mainColor } = await config.globalConfig()
    const color = mainColor


    const embed = new EmbedBuilder()
        .setColor(mainColor)
        .setTitle('Get Info:')



    return embed
}