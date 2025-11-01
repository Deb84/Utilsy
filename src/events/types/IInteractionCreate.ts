import type { Interaction } from "discord.js";
import type {IEvent, IEventClass} from "./IEvent.ts";
export type {Interaction}

export interface IInteractionCreateEvent extends IEventClass<[Interaction]> {
    event: (interaction: Interaction) => void
}