import {readdirSync, Dirent} from 'fs'
import path from 'path'
import { config } from '../../config/index.ts';
import type { BotConfig } from "../../types/enums.types";

type getCommandsSettings = {
    commandName?: string
    toLowerCase?: boolean
}

class CommandsFsUtils {
    private config: BotConfig
    private commandsPath: string
    private entryPoint: string

    constructor(config: BotConfig) {
        this.config = config
        this.commandsPath = config.paths.commands
        this.entryPoint = 'index'
    }

    getCommands(p = this.commandsPath, settings: getCommandsSettings = {}): Dirent[] {
        let commands: Dirent[] = []
        const commandFiles = readdirSync(p, { withFileTypes: true })

        for (const file of commandFiles) {
            if (file.isDirectory() && p === this.commandsPath) {
                commands = commands.concat(this.getCommands(path.join(file.parentPath, file.name), {commandName: this.entryPoint, toLowerCase: true}))
                continue
            }

            const fileName = settings.toLowerCase ? file.name.replace('.ts', '').toLowerCase() : file.name.replace('.ts', '')
            settings.commandName && fileName === settings.commandName ? commands.push(file) : null
            !settings.commandName && file.name.endsWith('.ts') ? commands.push(file) : null
        }
        return commands 
    }

    search(p: string, expectedName: string): Dirent | undefined {
        const entryPoint = 'index'
        const commandFiles = readdirSync(p, { withFileTypes: true })
        for (const file of commandFiles) {
            if (file.isDirectory() && file.name === expectedName) {
                return this.search(path.join(file.parentPath, file.name), entryPoint)
            }
            const fileName = file.name.replace('.ts', '').toLowerCase()
            if (fileName === expectedName) return file
        }
    }

    importCommand() {

    }
}

//to remove after implement
const c = new CommandsFsUtils(config)

console.log(c.getCommands())
