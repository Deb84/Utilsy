import { ChatInputCommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import { config } from '../config/index.ts'
import type { Command } from "../types/enums.types.ts";
import {hasCommandAccess} from "./accessHandler.ts";

export default async (commandInteraction: ChatInputCommandInteraction) => {
    function search(p: string, expectedName: string) {
            const entryPoint = 'index'
            const commandFiles = readdirSync(p, { withFileTypes: true })
            for (const file of commandFiles) {
                if (file.isDirectory() && file.name === expectedName) {
                    return search(path.join(file.parentPath, file.name), entryPoint)
                }
                const fileName = file.name.replace('.ts', '').toLowerCase()
                if (fileName === expectedName) return file
            }
        }

    if (commandInteraction instanceof ChatInputCommandInteraction) { // check if command is an interaction
        const commandsPath = config.paths.commands


        try {
            const file = search(commandsPath, commandInteraction.commandName)

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