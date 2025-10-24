import { REST, Routes } from "discord.js"
import { getCommandAccess } from "../../handlers/accessHandler.ts";
import type { CommandData } from "../../types/enums.types.ts";


export default async (rest: REST, commandData: CommandData) => {
    try {
        if (commandData.commandType == 'global' ) {
            await rest.post(
                Routes.applicationCommands(process.env.APPID!),
                { body: commandData.slashCommandBuild?.toJSON() }
            );
            console.log(`"${commandData.commandName}" declared at Discord REST API as a global slash command`)

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            for (const guildID of (await getCommandAccess(commandData)).guildIDs) {
                await rest.post(
                    Routes.applicationGuildCommands(process.env.APPID!, guildID),
                    { body: commandData.slashCommandBuild?.toJSON() }
                );
                console.log(`"${commandData.commandName}" declared at Discord REST API as a guild slash command`)
            }
        }
    } catch (error) {
        console.error(error)
    }
}