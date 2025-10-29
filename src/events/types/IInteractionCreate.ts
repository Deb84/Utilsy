import { Interaction } from "discord.js";
import IEvent from "./IEvent";
export {Interaction}

export interface IInteractionCreateEvent extends IEvent<Interaction> {
    event: (interaction: Interaction) => void
}