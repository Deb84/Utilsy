import { Interaction } from "discord.js";
import { ShowableError } from "./ShowableError.ts";

export abstract class ShowableCommandErr extends ShowableError {
    abstract commandName: string
    abstract userId: string
    abstract interaction: Interaction
    abstract userOnly: boolean
}