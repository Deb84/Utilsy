import type {IAccessHandler, CommandInteraction} from "./types/IAccessHandler.ts";
export type {IAccessHandler}

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

export class AccessHandler implements IAccessHandler {
    private config: BotConfig

    constructor(config: BotConfig) {
        this.config = config
    }


    async hasCommandAccess(interaction: CommandInteraction, accessLevel: AccessLevel) {
        const { accessConfig, accessState } = await this.config.globalConfig()

        const userId = interaction.user?.id;
        const guildId = interaction.guild?.id;

        const isIn = (scope: 'test' | 'private') => {
            const acfg = accessConfig[scope]
            if (!acfg) return false
            return (
                (userId !== undefined && acfg.userIDs.includes(userId)) 
                || (guildId !== undefined && acfg.guildIDs.includes(guildId))
            )
        }

        
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

    async getCommandAccess(commandData: CommandData): Promise<Access | 'public'> {
        const { accessConfig } = await this.config.globalConfig()
        const accessLevel = commandData.accessLevel
        return accessConfig[accessLevel]
    }
}