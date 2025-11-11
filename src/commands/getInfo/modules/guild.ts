import { discordInfos } from "@/services/discord/discordInfos/discordInfos.ts";
import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts";
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Role, User, userMention } from "discord.js";
import * as R from 'result'


export default async (deps: {
    discordInfos: IDiscordInfos
}, args: {
    embed: EmbedBuilder, 
    interaction: ChatInputCommandInteraction
}
) => {
    const interaction = args.interaction
    const guildId = interaction.options.getString('id')
    const full = interaction.options.getBoolean('full')

    // assert

    
    // define userId
    const newGuildId = guildId ?? interaction.guildId
    if (!newGuildId) return R.err(new Error('Incorrect guild id'))

    const guildObjRes = await deps.discordInfos.getGuild(newGuildId) // get user object from userId
    if (guildObjRes.type === 'err') return R.err(new Error('Unable to find this guild (the bot need to be in the guild)'), guildObjRes)
    const guild = guildObjRes.value // extract value from result

    console.log(guild)

    //prebuid
    const guildCreationDate = full // make this more proper
        ? guild.createdAt.toISOString().slice(0, 19).replace('T', ' at ') 
        : guild.createdAt.toISOString().slice(0, 16).replace('T', ' at ')

    const owner = (await guild.fetchOwner({force: true})).id


    //build
    args.embed
        .setTitle('GetInfo: user') // set thumbnail (update userinfo)
        .setThumbnail(guild.iconURL())
        .addFields(
            {name: 'Name', value: guild.name, inline: true},
            {name: 'Id', value: guild.id, inline: true},
            {name: 'Owner', value: userMention(owner)},
            {name: 'Date of account creation', value: guildCreationDate}
        )

    if (full) args.embed // full build
    .addFields(
        
    )
        
    return R.ok(args.embed)
}