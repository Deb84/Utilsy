import { ChatInputCommandInteraction, CommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import { config } from '../config/index.ts'
import type { Command } from "../types/enums.types.ts";
import {hasCommandAccess} from "./accessHandler.ts";

export default async (commandInteraction: ChatInputCommandInteraction) => {
    if (commandInteraction instanceof ChatInputCommandInteraction) { // check if command is an interaction
        try {
            const commandsPath = config.paths.commands
            const commandFiles = readdirSync(commandsPath, { withFileTypes: true })
            const file = commandFiles.find(file => file.name.replace('.ts', '').toLowerCase() === commandInteraction.commandName)

            if (file) {
                const filePath = path.join(file?.parentPath, file.name)
                const commandModule = await import(pathToFileURL(filePath).href)
                const command = commandModule.default as Command
                if (await hasCommandAccess(commandInteraction, command.data.accessLevel)) {
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