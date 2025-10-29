import { Interaction } from "discord.js";
export {Interaction}

export interface IInteractionHandler {
    handleInteraction: (interaction: Interaction) => void
}