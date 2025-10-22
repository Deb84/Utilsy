import type { Interaction } from "discord.js";
import interactionHandler from "../handlers/interactionHandler.ts";

export default (interaction: Interaction) => {
    interactionHandler(interaction)
}