import { ShowableError } from "@/errors/showable/base/ShowableError.ts";
import * as R from 'result'
import type { IErrorReplyer, IEmbedTemplatesBuilder, options } from "./types/IErrorReplyer.ts";
import { InteractionReplyOptions, MessageFlags } from "discord.js";


export class ErrorReplyer implements IErrorReplyer {
    constructor(
        private embedTemplatesBuilder: IEmbedTemplatesBuilder
    ) {}

    async embedReply(err: ShowableError, options: options) {
        const getEmbedResult = await this.embedTemplatesBuilder.buildFromTemplate('Error')

        if (getEmbedResult.type === 'err') return R.err(getEmbedResult.error)

        const embed = getEmbedResult.value
        embed.setDescription(err.message)

        if (err.interaction.isCommand()) {
            const replyBuild: InteractionReplyOptions = {
                embeds: [embed],
                flags: err.ephermeral ? MessageFlags.Ephemeral : undefined
            }

            options.defered
                ? err.interaction.followUp(replyBuild)
                : err.interaction.reply(replyBuild)
        }

        return R.ok(undefined)
    }

    async reply(err: ShowableError, options: options) {
        if (err.interaction.isCommand()) {
            options.defered
                ? err.interaction.followUp(err.message)
                : err.interaction.reply(err.message)
        }

        return R.ok(undefined)
    }
}