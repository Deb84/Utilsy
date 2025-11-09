import { IErrorManager } from "@/managers/types/IErrorManager.ts";
import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts";
import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts";
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, User } from "discord.js";
import * as R from 'result'

export default async (deps: {
    errorManager: IErrorManager
    ETB: IEmbedTemplatesBuilder
    discordInfos: IDiscordInfos
}, args: {
    embed: EmbedBuilder, 
    interaction: ChatInputCommandInteraction
}
) => {
    const i = args.interaction
    const userId = i.options.getString('id')
    const mention = i.options.getMentionable('mention')
    const full = i.options.getBoolean('full')

    if (userId && mention) throw new Error('Use only one option') // to manage
    if (mention && !(mention instanceof GuildMember)) throw new Error('The mention is not an guildMember') // to manage
    const newUserId = userId ? userId : mention ? mention.user.id : i.user.id

    const userObjR = await deps.discordInfos.getUser(newUserId)
    if (userObjR.type === 'err') throw new Error('unable to find a user for this id')
    const userObj = userObjR.value
    console.log(userObj)

    //build
    args.embed
        .setTitle('GetInfo: user') // set thumbnail (update userinfo)
        .setThumbnail(userObj.displayAvatarURL({size: 1024}))
        .addFields({name: 'DisplayName', value: userObj.displayName, inline: true})
        .addFields({name: 'Username', value: userObj.username, inline: true})
        .addFields({name: 'Id', value: userObj.id, inline: true, })
        .addFields({name: 'DisplayName', value: userObj.displayName, inline: true})
        .addFields({name: 'Date of account creation', value: String(userObj.createdAt), inline: true})

    if (full) args.embed
        .addFields({name: 'Bot', value: String(userObj.bot), inline: true})
        .addFields({name: 'System', value: String(userObj.system), inline: true})
        .addFields({name: 'Discriminator', value: userObj.discriminator, inline: true})
        .addFields({name: 'Avatar (hash)', value: String(userObj.avatar), inline: true})
        .addFields({name: 'Avatar (url)', value: String(userObj.avatarURL())})
        .addFields({name: 'Banner (hash)', value: String(userObj.banner), inline: true})
        .addFields({name: 'Banner (url)', value: String(userObj.bannerURL())})
        .addFields({name: 'Tag', value: String(userObj.tag), inline: true})
        .addFields({name: 'HexAccentColor', value: String(userObj.hexAccentColor), inline: true})
        

    return R.ok(args.embed)
}