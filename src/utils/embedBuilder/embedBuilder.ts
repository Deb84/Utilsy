import type { Channel, Guild, Role, User } from 'discord.js'
import getTemplates from './templates/index.ts'
import type { BotConfig } from '../../types/enums.types.ts'



class embedBuild {
    private config: BotConfig
    private templatePath: string

    constructor(config: BotConfig) {
        this.config = config
        this.templatePath = config.paths.embedTemplates
    }

    async getFromTemplate(templateName: string) {
        return await getTemplates(templateName, this.templatePath)
    }


    async buildViaTemplate(templateName: string, title:string, arr: User | Guild | Channel | Role) {
        const template = await getTemplates(templateName, this.templatePath)
        if (!template) throw new Error(`Unable to get the templete ${templateName}`)
        const embed = await template.getEmbed()
        
        embed.setTitle(`${embed.data.title ?? ''} ${title}`)

        template.keys?.forEach(e => 
            embed.addFields({name: e ?? '-', value: (arr as any)[e] ?? '-'})
        )

        return embed
    }

}

let instance: embedBuild | null = null

export function embedBuildInit(config: BotConfig) {
    if (!instance) instance = new embedBuild(config)
}

export function getEmbedBuild() {
    if (!instance) throw new Error('embedBuild not initialized')
    return instance
}