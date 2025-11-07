import { ShowableError } from "@/errors/showable/base/ShowableError.ts";
import * as R from 'result'
import type { IErrorReplyer, IEmbedTemplatesBuilder } from "./types/IErrorReplyer.ts";


export class ErrorReplyer implements IErrorReplyer {
    constructor(
        private embedTemplatesBuilder: IEmbedTemplatesBuilder
    ) {}

    async reply(err: ShowableError) {
        const result = await this.embedTemplatesBuilder.buildFromTemplate('Error')
        console.log(result)
        if (result.type === 'err') return R.err(result.error)

        const embed = result.value
        embed.setDescription(err.displayedMsg)

        if (err.interaction.isCommand()) {
            console.log('aa')
            err.interaction.reply({
                embeds: [embed],
                ephemeral: err.userOnly
            })
        }

        return R.ok(undefined)
    }
}