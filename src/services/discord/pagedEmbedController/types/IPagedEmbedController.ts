import type { EmbedBuilder } from "discord.js";

export interface IPagedEmbedController {
    next(): void;
    previous(): void;
    init(): void;
}
