import type { Interaction } from "discord.js";
import commandsHandler from "./commandsHandler.ts";

export default (interaction: Interaction) => {

    if (interaction.isChatInputCommand()) {
        commandsHandler(interaction)
    }
}