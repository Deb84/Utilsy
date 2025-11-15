import { ChatInputCommandInteraction } from "discord.js";
import { ShowableError } from "./ShowableError.ts";

export abstract class ShowableCommandErr extends ShowableError {
    abstract commandName: string
    abstract subCommandName: string | null
    abstract userId: string
    abstract interaction: ChatInputCommandInteraction
}