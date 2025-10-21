import type { Interaction } from "discord.js";
import commandsHandler from "./commandsHandler.ts";


/* Handle the interaction and route them */


export default (interaction: Interaction) => {

    if (interaction.isChatInputCommand()) {
        commandsHandler(interaction)
    }
}