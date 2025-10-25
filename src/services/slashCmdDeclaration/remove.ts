import { REST, Routes } from "discord.js"
import type { APIApplicationCommand } from "discord.js"
import { getCommandAccess } from "../../handlers/accessHandler.ts";
import get from './get.ts'
import type { CommandData } from "../../types/enums.types.ts";
import { isArray } from "../../utils/checkObjectType.ts";

export default async (rest: REST, commandData: CommandData) => {
    try {
        if (commandData.commandType == 'global' ) {
            const command = await get(rest, commandData)
            if (command && !isArray(command)) {
                await rest.delete(
                Routes.applicationCommand(process.env.APPID!, command.id)
            );
            }
            console.log(`Request sent to the Discord REST API to remove "${commandData.commandName}" global slash command`)

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            // a guild command, if added on mutliple guild, can have multiple instances with different ids, get() get them
            var commands = await get(rest, commandData) // get the command from the data
            if (commands && isArray(commands)) { 
                commands = commands.filter(Boolean) // remove problematic value

                for (const command of commands) { // delete the command for each guild
                    if (!command?.guild_id) return

                    await rest.delete(
                        Routes.applicationGuildCommand(process.env.APPID!, command.guild_id, command.id)
                    );
                    console.log(`Request sent to the Discord REST API to remove "${commandData.commandName}" guild slash command for the guild ${command.guild_id}`)
                }
            }
        }
    } catch (error) {
        console.error(error)
    }
}