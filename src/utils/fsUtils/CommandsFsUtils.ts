import {readdir} from 'fs/promises'
import type {Dirent} from 'fs'
import path from 'path'
import { config } from '../../config/index.ts';
import type { BotConfig } from "../../types/enums.types";
import { pathToFileURL } from 'url';

type GetCommandsSettings = {
    commandName?: string
    toLowerCase?: boolean
    newPath?: string
}

type Command = {
    name: string
    file: Dirent
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



    async getCommands(settings: GetCommandsSettings = {}, p = this.commandsPath): Promise<Command[]> {
        /* 
        Commands folder reading algorithm :
        The function retourn an array of command object, each object contains the name of the command and the Dirent object of the command file

        There's two kind of layers : main & sub
        For the main, every .ts files are added in a command object, the command name is the filename without the ext
        For the sub, an entry point file is searched (index.ts) and added to a command object, the command name is the parent folder name

        The function starts to search in the main then search in each sub of the main folder
        */
 
        function createCmd(name: string, file: Dirent): Command {                                                           // create a command object
            return {
                name: name,
                file: file
            }
        }

        let commands: Command[] = []
        const commandFiles = await readdir(p, { withFileTypes: true })

        for (const file of commandFiles) {
            if (file.isDirectory() && p === this.commandsPath) {
                commands = commands.concat(await this.getCommands({commandName: this.entryPoint, toLowerCase: true}, path.join(file.parentPath, file.name)))
                continue
            }

            const fileName = settings.toLowerCase ? file.name.replace('.ts', '').toLowerCase() : file.name.replace('.ts', '')
            const parentName = settings.toLowerCase ? path.basename(file.parentPath).toLowerCase() : path.basename(file.parentPath)

            if (settings.commandName && fileName === settings.commandName) commands.push(createCmd(parentName, file))      // if the file is an entryPoint, it added to the commands list (recursive mode only)
            if (!settings.commandName && file.name.endsWith('.ts')) commands.push(createCmd(fileName, file))               // if the fileName end with .ts, it added to the commands list (non recursive)
        }
        return commands 
    }

    async search(expectedName: string): Promise<Dirent | undefined> {
        const commands = await this.getCommands({toLowerCase: true})
        const command = commands.find(e => e.name === expectedName)
        return command?.file
    }

    async importCommand(expectedName: string) {
        const file = await this.search(expectedName)
        if (file) {
            const filePath = path.join(file.parentPath, file.name)
            return await import(pathToFileURL(filePath).href)
        }
    }
}


