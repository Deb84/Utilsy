import type { Interaction } from "discord.js";
export type {Interaction}

export interface IInteractionHandler {
    handleInteraction: (interaction: Interaction) => void
}