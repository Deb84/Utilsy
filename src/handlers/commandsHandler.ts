import { CommandInteraction, Message } from "discord.js";

import Hi from "../commands/slash/Hi.ts";

// TODO : 
// - Dynamic import of commands

function checkCommandName(command: CommandInteraction, expectedName: string) {
    return Boolean(command.commandName === expectedName) // check if the commandName is the same than the expectedName
}

export default (command: Message | CommandInteraction) => {
    if (command instanceof CommandInteraction) { // check if command is an interaction
        if (checkCommandName(command, 'hi')) {Hi(command)}

    } else if (command instanceof Message) { // check if command is an message
        null
    }

}