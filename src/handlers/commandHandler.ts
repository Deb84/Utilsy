import { CommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import normalizePath from '../utils/normalizePath.ts'
import paths from '../config/paths.json' with {type : 'json'}
import type { Command } from "../types/enums.types.ts";
import accessHandler from "./accessHandler.ts";


export default async (commandInteraction: CommandInteraction) => {
    if (commandInteraction instanceof CommandInteraction) { // check if command is an interaction
        try {
            const commandsPath = normalizePath(paths.commands)
            const commandFiles = readdirSync(commandsPath, { withFileTypes: true })
            const file = commandFiles.find(file => file.name.replace('.ts', '').toLowerCase() === commandInteraction.commandName)
            console.log(file)
            if (file) {
                const filePath = path.join(file?.parentPath, file.name)
                const commandModule = await import(pathToFileURL(filePath).href)
                const command = commandModule.default as Command
                console.log(command)
                if (await accessHandler(commandInteraction, command.data.accessLevel)) {
                    command.execute(commandInteraction)
                } else {
                    commandInteraction.reply("you don't have access to this")
                }

            } else {
                commandInteraction.reply("this command does not exist")
            }



        } catch (error) {
            console.log(error)
        }
    } 
}