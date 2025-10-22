import { REST, Routes } from "discord.js"
import type { APIApplicationCommand } from "discord.js"
import type { CommandData } from "../../types/enums.types.ts";

export default async (rest: REST, commandData: CommandData, command: APIApplicationCommand) => {
    try {
        if (commandData.commandType == 'global' ) {
            await rest.delete(
                Routes.applicationCommand(process.env.APPID!, command.id)
            );
            console.log(`Request send to the Discord REST API to remove "${commandData.commandName}" global slash command`)

        } else if (commandData.commandType == 'guild' && commandData.access?.guildIDs) {
            for (const guildID of commandData.access.guildIDs) {
                await rest.delete(
                    Routes.applicationGuildCommand(process.env.APPID!, guildID, command.id)
                );
                console.log(`Request send to the Discord REST API to remove "${commandData.commandName}" guild slash command`)
            }
        }
    } catch (error) {
        console.error(error)
    }
}