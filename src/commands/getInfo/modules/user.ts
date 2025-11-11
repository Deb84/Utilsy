import { GenericCmdErr } from "@/errors/showable/command-errors.ts";
import { IErrorManager } from "@/managers/types/IErrorManager.ts";
import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts";
import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts";
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Role, User } from "discord.js";
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

    // assert
    if (userId && mention) return R.err(new Error('Please use only one options to get the user informations'))
    if (mention && (mention instanceof Role)) return R.err(new Error('Please mention a user, not a role'))
    if (mention && !(mention instanceof GuildMember)) return R.err(new Error('The mentionned user is not a member of the guild'))

    // define userId
    const newUserId = userId ? userId : mention ? mention.user.id : i.user.id


    const userObjR = await deps.discordInfos.getUser(newUserId) // get user object from userId
    if (userObjR.type === 'err') return R.err(new Error('Unable to find this user'), userObjR)
    const userObj = userObjR.value // extract value from result

    //build
    args.embed
        .setTitle('GetInfo: user') // set thumbnail (update userinfo)
        .setThumbnail(userObj.displayAvatarURL({size: 1024}))
        .addFields(
            {name: 'DisplayName', value: userObj.displayName, inline: true},
            {name: 'Username', value: userObj.username, inline: true},
            {name: 'Id', value: userObj.id, inline: true, },
            {name: 'DisplayName', value: userObj.displayName, inline: true},
            {name: 'Date of account creation', value: String(userObj.createdAt), inline: true}
        )

    if (full) args.embed
    .addFields(
        {name: 'Bot', value: String(userObj.bot), inline: true},
        {name: 'System', value: String(userObj.system), inline: true},
        {name: 'Discriminator', value: userObj.discriminator, inline: true},
        {name: 'Avatar (hash)', value: String(userObj.avatar), inline: true},
        {name: 'Avatar (url)', value: String(userObj.avatarURL())},
        {name: 'Banner (hash)', value: String(userObj.banner), inline: true},
        {name: 'Banner (url)', value: String(userObj.bannerURL())},
        {name: 'Tag', value: String(userObj.tag), inline: true},
        {name: 'HexAccentColor', value: String(userObj.hexAccentColor), inline: true}
    )
        

    return R.ok(args.embed)
}