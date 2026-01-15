import { ICustomIdGenerator } from "@/services/generators/customIdGenerator/customId-generator.ts"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js"

export function createButton(customIdGenerator: ICustomIdGenerator, label: string) {
    const customId = customIdGenerator.generate()
    
    return {btn: 
        new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId(customId)
            .setLabel(label)
            .setStyle(ButtonStyle.Primary)
    ),
    id: customId
    }
}