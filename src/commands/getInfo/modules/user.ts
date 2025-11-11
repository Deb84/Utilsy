import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts";
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Role, User } from "discord.js";
import * as R from 'result'


export default async (deps: {
    discordInfos: IDiscordInfos
}, args: {
    embed: EmbedBuilder, 
    interaction: ChatInputCommandInteraction
}
) => {
    const interaction = args.interaction
    const userId = interaction.options.getString('id')
    const mention = interaction.options.getMentionable('mention')
    const full = interaction.options.getBoolean('full')

    // assert
    if (userId && mention) return R.err(new Error('Please use only one options to get the user informations'))
    if (mention && (mention instanceof Role)) return R.err(new Error('Please mention a user, not a role'))
    
    // define userId
    const mentionUserId = (mention instanceof GuildMember) ? mention.id : (mention instanceof User) ? mention.id : undefined // mention can only be GuildMember or User object
    const newUserId = userId ? userId : mentionUserId ? mentionUserId : interaction.user.id

    const userObjR = await deps.discordInfos.getUser(newUserId) // get user object from userId
    if (userObjR.type === 'err') return R.err(new Error('Unable to find this user'), userObjR)
    const user = userObjR.value // extract value from result

    
    //prebuid
    const accountCreationDate = full // make this more proper
        ? user.createdAt.toISOString().slice(0, 19).replace('T', ' at ') 
        : user.createdAt.toISOString().slice(0, 16).replace('T', ' at ')

    //build
    args.embed
        .setTitle('GetInfo: user') // set thumbnail (update userinfo)
        .setThumbnail(user.displayAvatarURL({size: 2048}))
        .addFields(
            {name: 'DisplayName', value: user.displayName, inline: true},
            {name: 'Username', value: user.username, inline: true},
            {name: 'Id', value: user.id, inline: true, },
            {name: 'Date of account creation', value: accountCreationDate}
        )

    if (full) args.embed // full build
    .addFields(
        {name: '', value: ''},  // spacement
        {name: 'Bot', value: String(user.bot), inline: true},
        {name: 'System', value: String(user.system), inline: true},
        {name: 'Discriminator', value: user.discriminator, inline: true},
        {name: '', value: ''},  // spacement
        {name: 'Avatar (hash)', value: String(user.avatar), inline: true},
        {name: 'Avatar (url)', value: String(user.avatarURL({size: 2048}))},
        {name: 'Banner (hash)', value: String(user.banner), inline: true},
        {name: 'Banner (url)', value: String(user.bannerURL({size: 2048}))},
        {name: '', value: ''}, // spacement
        {name: 'Tag', value: user.tag, inline: true},
        {name: 'HexAccentColor', value: String(user.hexAccentColor), inline: true}
    )
        
    return R.ok(args.embed)
}