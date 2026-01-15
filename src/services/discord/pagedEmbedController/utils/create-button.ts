import { ICustomIdGenerator } from "@/services/generators/customIdGenerator/customId-generator.ts"
import { ButtonBuilder, ButtonStyle } from "discord.js"
import { ButtonComponentObj } from "../types/types.ts"

export function createButton(customIdGenerator: ICustomIdGenerator, label: string, ref: string) {
    const customId = customIdGenerator.generate()
    
    return {
        component: 
        new ButtonBuilder()
            .setCustomId(customId)
            .setLabel(label)
            .setStyle(ButtonStyle.Primary),
    id: customId,
    ref
    } as ButtonComponentObj
}