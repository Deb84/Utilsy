import { Interaction } from "discord.js";
import interactionHandler from "../handlers/interactionHandler";

export default (interaction: Interaction) => {
    interactionHandler(interaction)
}