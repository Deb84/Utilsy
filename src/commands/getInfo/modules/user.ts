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
    console.log(mention)
    if (userId && mention) throw new Error('Use only one option') // to manage
    if (mention && !(mention instanceof GuildMember)) throw new Error('The mention is not an guildMember') // to manage
    const newUserId = userId ? userId : mention ? mention.user.id : i.user.id

    const userObjR = await deps.discordInfos.getUser(newUserId)
    if (userObjR.type === 'err') throw new Error('unable to find an user for this id')
    const userObj = userObjR.value
    console.log(userObj)

    //build
    args.embed
        .setTitle('GetInfo: user') // set thumbnail (update userinfo)
        .addFields({name: 'DisplayName', value: userObj.displayName, inline: true})
        .addFields({name: 'Username', value: userObj.username, inline: true})
        .addFields({name: 'Id', value: userObj.id, inline: true, })
        .addFields({name: 'DisplayName', value: userObj.displayName, inline: true})

    return R.ok(args.embed)
}