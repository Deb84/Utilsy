import getTemplates from './templates/getTemplate.ts'
import * as R from 'result'
import type { IEmbedTemplatesBuilder } from './types/IEmbedTemplatesBuilder.ts'
export type {IEmbedTemplatesBuilder}


export class EmbedTemplatesBuilder implements IEmbedTemplatesBuilder {
    private templatePath: string
    private baseName: string

    constructor(private config: BotConfig) {
        this.config = config
        this.templatePath = config.paths.embedTemplates
        this.baseName = 'base'
    }

    async getTemplate(templateName: string) {
        const template = await getTemplates(templateName, this.templatePath)
        if (template) return R.ok(template)
        return R.err(new Error('Unable to get template'))
    }

    async getBase() {
        const template = await getTemplates(this.baseName, this.templatePath)
        if (template) return R.ok(template)
        return R.err(new Error('Unable to get base template'))
    }

    async buildFromTemplate(templateName: string) {
        const template = await getTemplates(templateName, this.templatePath)
        if (!template) return R.err(new Error(`Unable to get the templete ${templateName}`))
        const embed = await template.getEmbed(this.config)

        return R.ok(embed)
    }

}