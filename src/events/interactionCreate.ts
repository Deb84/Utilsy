import { IInteractionHandler, Interaction } from "../handlers/types/IInteractionHandler";

export default class InteractionCreateEvent {
    private interactionHandler: IInteractionHandler

    constructor(interactionHandler: IInteractionHandler) {
        this.interactionHandler = interactionHandler
    }

    event(interaction: Interaction) {
        this.interactionHandler.handleInteraction(interaction)
    }
}
