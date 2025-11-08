 import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { Command } from "../types/CommandAb.ts"
import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts"
import buildEmbed from "./utils/build-embed.ts"
import buildCommand from "./utils/build-command.ts"
import * as mod from './modules/index.ts'

type SubCommand = 'user' | 'guild' | 'channel' | 'role' | 'emoji' | 'message'
type SubcommandHandler = (ETB: IEmbedTemplatesBuilder, i: ChatInputCommandInteraction) => Promise<Result<EmbedBuilder>>

// convert mention to id
// ETB gived to each module
// module return the finalised embed et execute reply
export const deps = ['EmbedTemplatesBuilder']

class GetInfo extends Command {
    static name = 'getInfo'
    static description = 'Return an embed of selected informations'
    static accessLevel: AccessLevel = 'test'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = buildCommand(new SlashCommandBuilder().setName(this.name).setDescription(this.description))

    constructor(private ETB: IEmbedTemplatesBuilder) {
        super()
    }


    async execute(interaction: ChatInputCommandInteraction) {
        const sub = interaction.options.getSubcommand()

        const handlers: Record<SubCommand, SubcommandHandler> = {
            user: (ETB, i) => mod.user(ETB, i),
            guild: (ETB, i) => mod.user(ETB, i),
            channel: (ETB, i) => mod.user(ETB, i),
            role: (ETB, i) => mod.user(ETB, i),
            emoji: (ETB, i) => mod.user(ETB, i),
            message: (ETB, i) => mod.user(ETB, i)
        }

        const embedR = await this.ETB.getBase()
        if (embedR.type === 'err') throw new Error('ici') // TODO return error to user 

        const buildedEmbed = buildEmbed(embedR.value)

    }
}



export default GetInfo