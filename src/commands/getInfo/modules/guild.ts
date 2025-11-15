import { DiscordInfos } from "@/services/discord/discordInfos/discordInfos.ts";
import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts";
import { APIEmbedField, channelMention, ChatInputCommandInteraction, EmbedBuilder, GuildMember, Role, User, userMention } from "discord.js";
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

    const fields = [
        {name: 'Name', value: guild.name, inline: true},
        {name: 'Id', value: guild.id, inline: true},
        {name: 'Member Count', value: String(guild.memberCount), inline: true},
        {name: 'Owner', value: userMention(owner)},
        {name: 'Date of guild creation', value: guildCreationDate},
        guild.description ? {name: 'Description', value: guild.description} : undefined
    ].filter(Boolean) as APIEmbedField[]

    const fullFields = [
        {name: 'Available', value: String(guild.available), inline: true},
        {name: 'ShardId', value: String(guild.shardId), inline: true},
        {name: 'Splash', value: String(guild.splash), inline: true},
        {name: 'Icon (hash)', value: String(guild.icon)},
        {name: 'Icon (url)', value: String(guild.iconURL({size: 2048}))},
        {name: 'Banner (hash)', value: String(guild.banner)},
        {name: 'Banner (url)', value: String(guild.bannerURL({size: 2048}))},
        {name: 'Verification Level', value: String(guild.verificationLevel), inline: true},
        {name: 'Vanity URL Code', value: String(guild.vanityURLCode), inline: true},
        {name: 'NSFW Level', value: String(guild.nsfwLevel), inline: true},
        {name: 'Premium Subscription Count', value: String(guild.premiumSubscriptionCount), inline: true},
        {name: 'Discovery Splash', value: String(guild.discoverySplash), inline: true},
        {name: 'Discovery Splash URL', value: String(guild.discoverySplashURL())},
        {name: 'Large', value: String(guild.large), inline: true},
        {name: 'Premium Progress Bar Enabled', value: String(guild.premiumProgressBarEnabled), inline: true},
        {name: 'Application Id', value: String(guild.applicationId), inline: true},
        {name: 'AFK Timeout', value: String(guild.afkTimeout+' sec'), inline: true},
        {name: 'AFK Channel Id', value: String(guild.afkChannelId), inline: true},
        guild.afkChannelId ? {name: 'AFK Channel', value: String(channelMention(guild.afkChannelId)), inline: true} : undefined,
        {name: 'System Channel Id', value: String(guild.systemChannelId), inline: true},
        guild.systemChannelId ? {name: 'System Channel', value: String(channelMention(guild.systemChannelId)), inline: true} : undefined,
        {name: 'Premium Tier', value: String(guild.premiumTier), inline: true},
        {name: 'Widget Enabled', value: String(guild.widgetEnabled), inline: true},
        {name: 'Widget Channel Id', value: String(guild.widgetChannelId), inline: true},
        guild.widgetChannelId ? {name: 'Widget Channel', value: String(channelMention(guild.widgetChannelId)), inline: true} : undefined,
        {name: 'Explicit Content Filter', value: String(guild.explicitContentFilter), inline: true},
        {name: 'MFA Level', value: String(guild.mfaLevel), inline: true},
        {name: 'Maximum Members', value: String(guild.maximumMembers), inline: true},
        {name: 'Maximum Presences', value: String(guild.maximumPresences), inline: true},
        {name: 'Maximum Video Channel Users', value: String(guild.maxVideoChannelUsers), inline: true},
        {name: 'Maximum Stage Video Channel Users', value: String(guild.maxStageVideoChannelUsers), inline: true},
        {name: 'Approximate Member Count', value: String(guild.approximateMemberCount), inline: true},
        {name: 'Approximate Presences Count', value: String(guild.approximatePresenceCount), inline: true},
        {name: 'Vanity URL Uses', value: String(guild.vanityURLUses), inline: true},
        {name: 'Rules Channels Id', value: String(guild.rulesChannelId), inline: true},
        guild.rulesChannelId ? {name: 'Rules Channel', value: String(channelMention(guild.rulesChannelId)), inline: true} : undefined,
        {name: 'Public Updates Channel Id', value: String(guild.maximumMembers), inline: true},
        guild.publicUpdatesChannelId ? {name: 'Public Updates Channel', value: String(channelMention(guild.publicUpdatesChannelId)), inline: true} : undefined,
        {name: 'Preferred Locale', value: String(guild.preferredLocale), inline: true},
        {name: 'Safety Alerts Channel Id', value: String(guild.maximumMembers), inline: true},
        guild.safetyAlertsChannelId ? {name: 'Safety Alerts Channel ID', value: String(channelMention(guild.safetyAlertsChannelId)), inline: true} : undefined,
        {name: 'Owner Id', value: String(guild.ownerId), inline: true},
    ].filter(Boolean) as APIEmbedField[]

    //build
    args.embed
        .setTitle('GetInfo: user') // set thumbnail (update userinfo)
        .setThumbnail(guild.iconURL({size: 2048}))
        .addFields(fields)

    if (full) args.embed // full build
    .addFields(fullFields)
        
    return R.ok(args.embed)
}