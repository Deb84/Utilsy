import type { Container } from "inversify";
import type { Client } from "discord.js";
import type { IEvent, IEventClass } from '../../events/types/IEvent.ts';
export type {Container, Client, IEvent, IEventClass}

export type Event = {
    deps: string[]
    default: IEventClass
}

export interface IEventHandlers {
    handle: () => Promise<void>
}