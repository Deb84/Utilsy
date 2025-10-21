import { CommandInteraction, Message } from "discord.js";

import Hi from "../commands/slash/Hi.ts";


function checkCommandName(command: CommandInteraction, expectedName: string) {
    return Boolean(command.commandName === expectedName)
}

export default (command: Message | CommandInteraction) => {
    if (command instanceof CommandInteraction) {
        if (checkCommandName(command, 'hi')) {Hi(command)}
    }
}