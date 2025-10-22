import { REST, Routes } from "discord.js";
import type { APIApplicationCommand } from "discord.js"
import type { CommandData } from "../../types/enums.types.ts";



export default async (rest: REST, commandData: CommandData) => {
    try {
        if (commandData.commandType == 'global' ) {
            const commands = await rest.get(Routes.applicationCommands(process.env.APPID!)) as APIApplicationCommand[]
            const command = commands.find(c => c.name === commandData.commandName);
            // log
            return [command]

        } else if (commandData.commandType == 'guild' && commandData.access?.guildIDs) {
            const commandsArray = []

            for (const guildID of commandData.access.guildIDs) {
                const commands = await rest.get(Routes.applicationGuildCommands(process.env.APPID!, guildID)) as APIApplicationCommand[]
                const command = commands.find(c => c.name === commandData.commandName);
                commandsArray.push(command)
            }
            // log
            return commandsArray
        }

    } catch (error) {
        console.error(error)
    }
}