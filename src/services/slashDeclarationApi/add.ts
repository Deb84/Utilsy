import { REST, Routes } from "discord.js"
import { CommandData } from "../../types/enums.types.ts";


export default async (rest: REST, commandData: CommandData) => {
    try {
        if (commandData.commandType == 'global' ) {
            await rest.post(
                Routes.applicationCommands(process.env.APPID!),
                { body: commandData.slashCommandBuild?.toJSON() }
            );
        } else if (commandData.commandType == 'guild' && commandData.access?.guildIDs) {
            for (const guildID of commandData.access.guildIDs) {
                await rest.post(
                    Routes.applicationGuildCommands(process.env.APPID!, guildID),
                    { body: commandData.slashCommandBuild?.toJSON() }
                );
            }
        }
    } catch (error) {
        console.error(error)
    }
}