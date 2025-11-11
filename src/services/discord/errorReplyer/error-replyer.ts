import { ShowableError } from "@/errors/showable/base/ShowableError.ts";
import * as R from 'result'
import type { IErrorReplyer, IEmbedTemplatesBuilder } from "./types/IErrorReplyer.ts";
import { MessageFlags } from "discord.js";


export class ErrorReplyer implements IErrorReplyer {
    constructor(
        private embedTemplatesBuilder: IEmbedTemplatesBuilder
    ) {}

    async reply(err: ShowableError) {
        const getEmbedRes = await this.embedTemplatesBuilder.buildFromTemplate('Error')

        if (getEmbedRes.type === 'err') return R.err(getEmbedRes.error)

        const embed = getEmbedRes.value
        embed.setDescription(err.message)

        if (err.interaction.isCommand()) {

            err.interaction.reply({
                embeds: [embed],
                flags: err.ephermeral ? MessageFlags.Ephemeral : undefined
            })
        }

        return R.ok(undefined)
    }
}