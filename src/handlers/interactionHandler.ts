import type {IInteractionHandler, Interaction, ICommandHandler} from "./types/IInteractionHandler.ts";
export type {IInteractionHandler}

/* Handle the interaction and route them */
export class InteractionHandler implements IInteractionHandler {
    private commandHandler: ICommandHandler

    constructor(commandHandler: ICommandHandler) {
        this.commandHandler = commandHandler
    }

    handleInteraction(interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            this.commandHandler.handle(interaction)
        }
    }
}