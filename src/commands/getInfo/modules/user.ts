import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts";
import { ChatInputCommandInteraction } from "discord.js";
import * as R from 'result'

export default async (ETB: IEmbedTemplatesBuilder, i: ChatInputCommandInteraction) => {
    const embedR = await ETB.getBase()
    if (embedR.type === 'ok') return R.ok(embedR.value)
    return R.err(embedR.error)
}