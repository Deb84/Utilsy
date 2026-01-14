import type { InteractionCallbackRegistry } from "@/bootstrap/types/RegistryTypes.ts";
import type { ICustomIdGenerator } from "@/services/generators/customIdGenerator/types/ICustomIdGenerator.ts";
import type { CommandInteraction } from "discord.js";

export interface IPagedEmbedController {
    setInteraction(interaction: CommandInteraction): void;
    setPagedEmbedBuilder(pagedEmbedBuilder: any): void;
    editMessage(): void;
    next(): void;
    previous(): void;
    send(): void;
}
