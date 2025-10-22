import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import normalizePath from '../utils/normalizePath.ts'
import {add, remove, get} from '../services/slashDeclarationApi/index.ts'
import paths from '../config/paths.json' with {type : 'json'}
import { accessConfig } from '../config/config.config.local.ts'
import type { CommandData } from "../types/enums.types.ts";


const commands = new Map()

const commandsPath = normalizePath(paths.commands)
const commandFiles = readdirSync(commandsPath, { withFileTypes: true })

// load every command of the commands dir
// TODO: only load when the command is require
for (const file of commandFiles) {
    const commandName = file.name.replace('.ts', '')
    const commandPath = path.join(file.parentPath, file.name)
    const command = await import(pathToFileURL(commandPath).href) as {
        data: CommandData
        execute: (interaction: CommandInteraction) => Promise<void> | void
        slashCommandBuild?: SlashCommandBuilder
    } // convert the path to url and import

    commands.set(commandName.toLowerCase(), command.execute)
    console.log(`Command "${file.name}" loaded`)

    // declare the command to the api

    const commandData = command.data
    commandData.slashCommandBuild = command.slashCommandBuild
    commandData.access = accessConfig[commandData.accessLevel]

    // TODO: impl slash Declaration :
    // check if the command is declared in the rest api
    // if yes, do nothing
    // if no, declare it
    // must be able to detect if each guild that should have access, has really access to the command, if one is missing, declare it
    
}


export default (command: CommandInteraction) => {
    if (command instanceof CommandInteraction) { // check if command is an interaction
        const handler = commands.get(command.commandName) // get the command func if exists
        if (handler) handler(command) // execute the command func if exists
    } 
}