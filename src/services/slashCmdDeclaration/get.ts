import { REST, Routes } from "discord.js";
import type { APIApplicationCommand } from "discord.js"
import type { CommandData } from "../../types/enums.types.ts";
import type IAccessHandler from "../../handlers/types/IAccessHandler.ts";



export default async (rest: REST, accessHandler: IAccessHandler, commandData: CommandData) => {
    try {
        if (commandData.commandType == 'global' ) {
            const commands = await rest.get(Routes.applicationCommands(process.env.APPID!)) as APIApplicationCommand[]
            const command = commands.find(c => c.name === commandData.commandName);
            // log 
            return command

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            const commandsArray = []
            const commandAccess = await accessHandler.getCommandAccess(commandData) as Access
            for (const guildID of commandAccess.guildIDs) {
                const commands = await rest.get(Routes.applicationGuildCommands(process.env.APPID!, guildID)) as APIApplicationCommand[]
                const command = commands.find(c => c.name === commandData.commandName);
                commandsArray.push(command)
            }
            // log
            return commandsArray // return an array of commands for each guild
        } else if (!await accessHandler.getCommandAccess(commandData)) {
            console.error(`Unable to get the command "${commandData.commandName}", check the type of the command or if the command scope have guilds`)
        }

    } catch (error) {
        console.error(error)
    }
}