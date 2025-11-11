import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js"
import { Command } from "../types/CommandAb.ts"
import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts"
import buildCommand from "./utils/build-command.ts"
import * as mod from './modules/index.ts'
import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts"
import { IErrorManager } from "@/managers/types/IErrorManager.ts"
import { GenericCmdErr } from "@/errors/showable/command-errors.ts"

type SubCommand = 'user' | 'guild' | 'channel' | 'role' | 'emoji' | 'message'

type Dependencies = {
  errorManager: IErrorManager
  EmbedTemplateBuilder: IEmbedTemplatesBuilder
  discordInfos: IDiscordInfos
}

type Handler = (
    deps: Dependencies,
    settings: {embed: EmbedBuilder, interaction: ChatInputCommandInteraction}
) => Promise<Result<EmbedBuilder>>

// convert mention to id
// module return the finalised embed et execute reply
export const deps = ['ErrorManager', 'EmbedTemplatesBuilder', 'DiscordInfos']

export default class GetInfo extends Command {
    static name = 'getinfo'
    static description = 'Return an embed of selected informations'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = buildCommand(new SlashCommandBuilder().setName(GetInfo.name).setDescription(GetInfo.description))
    private deps: Dependencies

    constructor(
        private errorManager: IErrorManager,
        private EmbedTemplateBuilder: IEmbedTemplatesBuilder,
        private discordInfos: IDiscordInfos,
    ) {
        super()
        this.deps = {
            errorManager: this.errorManager,
            EmbedTemplateBuilder: this.EmbedTemplateBuilder,
            discordInfos: this.discordInfos
        }
    }

    async execute(interaction: ChatInputCommandInteraction) {
        const sub = interaction.options.getSubcommand() as SubCommand
        const ephemeral = interaction.options.getBoolean('ephemeral')

        const handlers: Record<SubCommand, Handler> = {
            user: (...args) => mod.user(...args),
            guild: (...args) => mod.guild(...args),
            channel: (...args) => mod.user(...args),
            role: (...args) => mod.user(...args),
            emoji: (...args) => mod.user(...args),
            message: (...args) => mod.user(...args)
        }

        const getBaseRes = await this.EmbedTemplateBuilder.getBase()
        if (getBaseRes.type === 'err') throw new Error('ici') // TODO return error to user 

        const handler = handlers[sub]

        const buildedEmbedRes = await handler(this.deps,
        {
            embed: getBaseRes.value, 
            interaction: interaction
        })

        if (buildedEmbedRes.type === 'err') {
            this.errorManager.manage(new GenericCmdErr(
                {
                    msg: buildedEmbedRes.error.message,
                    commandName: GetInfo.name,
                    subCommandName: sub,
                    userId: interaction.user.id,
                    interaction: interaction,
                    result: buildedEmbedRes
                }
            ))
            return
        }

        const flags = ephemeral ? MessageFlags.Ephemeral : undefined
        interaction.reply({
            embeds:[buildedEmbedRes.value],
            flags: flags
        })
    }
}