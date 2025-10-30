import type { IInteractionHandler, Interaction } from "../handlers/types/IInteractionHandler.ts";
import type { IInteractionCreateEvent } from "./types/IInteractionCreate.ts";

export const deps = ['InteractionHandler']

export default class InteractionCreateEvent implements IInteractionCreateEvent {
    private interactionHandler: IInteractionHandler

    constructor(interactionHandler: IInteractionHandler) {
        this.interactionHandler = interactionHandler
    }

    event(interaction: Interaction) {
        this.interactionHandler.handleInteraction(interaction)
    }
}
