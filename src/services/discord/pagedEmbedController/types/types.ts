import { ActionRowBuilder, AnyComponentBuilder, ButtonBuilder } from "discord.js";

export interface ComponentBuilderObj {
    component: AnyComponentBuilder,
    id: string,
    ref: string
}

export interface ButtonComponentObj extends ComponentBuilderObj {
    component: ButtonBuilder,
    id: string,
    ref: string
}

export interface ActionRowObj {
    actionRow: ActionRowBuilder,
    ref: string
}