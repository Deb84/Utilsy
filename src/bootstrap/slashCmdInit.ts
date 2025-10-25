import { readdirSync } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { add, exists } from '../services/slashCmdDeclaration/index.ts'
import { config } from '../config/index.ts'
import type { Command } from '../types/enums.types.ts'


export default async () => {
    const commandPath = config.paths.commands
    const files = readdirSync(commandPath, {withFileTypes: true})
    
    for (const file of files) {
        const commandMod = await import(pathToFileURL(path.join(file.parentPath, file.name)).href)
        const command = commandMod.default as Command
        const commandData = command.data

        if (!(await exists(commandData))) {
            add(commandData)
        } 
    }
}