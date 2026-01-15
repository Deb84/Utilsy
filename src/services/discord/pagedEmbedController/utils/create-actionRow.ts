import { ICustomIdGenerator } from "@/services/generators/customIdGenerator/customId-generator.ts"
import { ActionRowBuilder } from "discord.js"
import { ActionRowObj } from "../types/types.ts"

export function createActionRow(ref: string) {
    return {
        actionRow: new ActionRowBuilder(),
    ref
    } as ActionRowObj
}