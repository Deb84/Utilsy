import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { Command } from "../types/CommandAb.ts"
import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts"
import buildCommand from "./utils/build-command.ts"
import * as mod from './modules/index.ts'
import { IDiscordInfos } from "@/services/discord/discordInfos/types/IDiscordInfos.ts"
import { IErrorManager } from "@/managers/types/IErrorManager.ts"
import { GenericCmdErr } from "@/errors/showable/command-errors.ts"

type SubCommand = 'user' | 'guild' | 'channel' | 'role' | 'emoji' | 'message'

type Handler = (
    deps: Deps,
    settings: {embed: EmbedBuilder, interaction: ChatInputCommandInteraction}
) => Promise<Result<EmbedBuilder>>

type Deps = {
  errorManager: IErrorManager
  ETB: IEmbedTemplatesBuilder
  discordInfos: IDiscordInfos
}

// convert mention to id
// module return the finalised embed et execute reply
export const deps = ['ErrorManager', 'EmbedTemplatesBuilder', 'DiscordInfos']

class GetInfo extends Command {
    static name = 'getinfo'
    static description = 'Return an embed of selected informations'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = buildCommand(new SlashCommandBuilder().setName(GetInfo.name).setDescription(GetInfo.description))

    constructor(
        private errorManager: IErrorManager,
        private ETB: IEmbedTemplatesBuilder,
        private discordInfos: IDiscordInfos,
        private deps: Deps
    ) {
        super()
        this.deps = {
            errorManager: this.errorManager,
            ETB: this.ETB,
            discordInfos: this.discordInfos
        }
    }


    async execute(interaction: ChatInputCommandInteraction) {
        const sub = interaction.options.getSubcommand() as SubCommand

        const handlers: Record<SubCommand, Handler> = {
            user: (...args) => mod.user(...args),
            guild: (...args) => mod.user(...args),
            channel: (...args) => mod.user(...args),
            role: (...args) => mod.user(...args),
            emoji: (...args) => mod.user(...args),
            message: (...args) => mod.user(...args)
        }

        const embedR = await this.ETB.getBase()
        if (embedR.type === 'err') throw new Error('ici') // TODO return error to user 

        const handler = handlers[sub]

        const buildedEmbedR = await handler(this.deps, 
        {
            embed: embedR.value, 
            interaction: interaction
        })

        if (buildedEmbedR.type === 'err') {
            const err = new GenericCmdErr(
                {
                    msg: buildedEmbedR.error.message,
                    commandName: GetInfo.name,
                    subCommandName: sub,
                    userId: interaction.user.id,
                    interaction: interaction,
                    result: buildedEmbedR
                }
            )
            console.log(err.result)
            this.errorManager.manage(err)
            return
        }


        interaction.reply({embeds:[buildedEmbedR.value]})
    }
}



export default GetInfo