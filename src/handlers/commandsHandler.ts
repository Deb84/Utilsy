import { CommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import normalizePath from '../utils/normalizePath.ts'
import paths from '../config/paths.json' with {type : 'json'}


const commands = new Map()

const commandsPath = normalizePath(paths.commands)
const commandFiles = readdirSync(commandsPath, { withFileTypes: true })

for (const file of commandFiles) {
    const commandName = file.name.replace('.ts', '')
    const commandPath = path.join(file.parentPath, file.name)
    const command = await import(pathToFileURL(commandPath).href) // convert the path to url and import
    commands.set(commandName.toLowerCase(), command.default)

    console.log(`Command "${file.name}" loaded`)
}


export default (command: CommandInteraction) => {
    if (command instanceof CommandInteraction) { // check if command is an interaction
        const handler = commands.get(command.commandName) // get the command func if exists
        if (handler) handler(command) // execute the command func if exists
    } 
}