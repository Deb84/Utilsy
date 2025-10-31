import type { Interaction } from "discord.js";
import type { ICommandHandler } from "./ICommandHandler.ts";
export type {Interaction, ICommandHandler}

export interface IInteractionHandler {
    handleInteraction: (interaction: Interaction) => void
}