import type { EmbedBuilder } from "discord.js";

export interface IPagedEmbedController {
    editMessage(embed: EmbedBuilder): void;
    next(): void;
    previous(): void;
    send(): void;
}
