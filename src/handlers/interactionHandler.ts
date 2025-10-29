import {IInteractionHandler, Interaction} from "./types/IInteractionHandler";
import { ICommandHandler } from "./types/ICommandHandler";

/* Handle the interaction and route them */
export default class InteractionHandler implements IInteractionHandler {
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