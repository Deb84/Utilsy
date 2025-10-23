import { CommandInteraction } from "discord.js";
import type { AccessLevel } from "../types/enums.types.ts";

// case 
// command public & bot public -> everyone              
// command test & bot public -> only testers           
// command private & bot public -> only private         

// command public & bot test -> only testers            
// command test & bot test -> only testers              
// command private & bot test -> only private           

// command public & bot private -> only private
// command test & bot private -> only private
// command private & bot private -> only private


export default async (interaction: CommandInteraction, accessLevel: AccessLevel) => {
    const config = await import("../config/config.config.local.ts" + '?update=' + Date.now());
    const { accessConfig, accessState } = config


    const userId = interaction.user?.id;
    const guildId = interaction.guild?.id;

    const isIn = (scope: 'public' | 'test' | 'private') =>
        accessConfig[scope]?.userIDs.includes(userId) ||
        accessConfig[scope]?.guildIDs.includes(guildId);

    
    if (isIn('private')) return true; // authorize private by default

    switch(accessState) {
        case 'public':
            if (accessLevel === 'public') return true
            if (accessLevel === 'test') return isIn('test')
            if (accessLevel === 'private') return isIn('private')
            break

        case 'test':
            if (accessLevel === 'public') return true
            if (accessLevel === 'test') return isIn('test')
            if (accessLevel === 'private') return isIn('private')
            break

        case 'private':
            if (accessLevel === 'private') return isIn('private')
            
    }

    return false 
}