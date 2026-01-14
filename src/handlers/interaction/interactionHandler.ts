import { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts";
import type {IInteractionHandler, Interaction, ICommandHandler} from "../types/IInteractionHandler.ts";
export type {IInteractionHandler}

/* Handle the interaction and route them */
export class InteractionHandler implements IInteractionHandler {

    constructor(
        private commandHandler: ICommandHandler,
        private interactionCallbackRegistry: InteractionCallbackRegistry
    ) {}

    handleInteraction(interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            this.commandHandler.handle(interaction)
        }

        if (interaction.isButton() || interaction.isStringSelectMenu()) {
            const customId = interaction.customId
            
            const callbackR = this.interactionCallbackRegistry.get(customId)

            if (callbackR.type === 'ok') callbackR.value()
            if (callbackR.type === 'err') console.error(callbackR.error)
            interaction.deferUpdate()

        }
    }
}