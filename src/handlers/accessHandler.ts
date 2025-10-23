import { CommandInteraction } from "discord.js";
import type { AccessLevel } from "../types/enums.types.ts";


export default async (interaction: CommandInteraction, accessLevel: AccessLevel) => {
    const config = await import("../config/config.config.local.ts" + '?update=' + Date.now());
    const accessConfig = config.accessConfig
    const accessState = config.accessState

    if (accessLevel == 'public' && accessState == 'public') return true // if the command is public and the bot is in public, everyone can access it

    var actualAccessState = accessConfig[accessState] // get the actual access state of the bot

    // check for private first
    if (interaction.guild && accessConfig.private.guildIDs.includes(interaction.guild.id)) return true
    if (interaction.user && accessConfig.private.userIDs.includes(interaction.user.id)) return true

    // check for the actual bot access state
    if (interaction.guild && actualAccessState?.guildIDs.includes(interaction.guild.id)) return true
    if (interaction.user && actualAccessState?.userIDs.includes(interaction.user.id)) return true

    return false 
}