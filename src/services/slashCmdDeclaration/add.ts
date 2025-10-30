import { REST, Routes } from "discord.js"
import type { CommandData } from "../../types/enums.types.ts";
import type IAccessHandler from "../../handlers/types/IAccessHandler.ts";


export default async (rest: REST, accessHandler: IAccessHandler, commandData: CommandData) => {
    try {
        if (commandData.commandType == 'global' ) {
            await rest.post(
                Routes.applicationCommands(process.env.APPID!),
                { body: commandData.slashCommandBuild?.toJSON() }
            );
            console.log(`"${commandData.commandName}" declared at Discord REST API as a global slash command`)

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            const commandAccess = await accessHandler.getCommandAccess(commandData) as Access
            for (const guildID of commandAccess.guildIDs) {
                await rest.post(
                    Routes.applicationGuildCommands(process.env.APPID!, guildID),
                    { body: commandData.slashCommandBuild?.toJSON() }
                );
                console.log(`"${commandData.commandName}" declared at Discord REST API as a guild slash command for guild ${guildID}`)
            }
        }
    } catch (error) {
        console.error(error)
    }
}