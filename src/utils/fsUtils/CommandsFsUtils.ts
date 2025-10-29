import {readdir} from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url';
import type {ICommandsFsUtils, GetCommandsSettings, CommandEntry, Dirent} from './types/ICommandsFsUtils'


// CBU (Can Be Upgraded):
// too many toLowerCase()


export class CommandsFsUtils implements ICommandsFsUtils {
    private config: BotConfig
    private commandsPath: string
    private entryPoint: string

    constructor(config: BotConfig) {
        this.config = config
        this.commandsPath = config.paths.commands
        this.entryPoint = 'index'
    }



    async getCommands(settings: GetCommandsSettings = {}, p = this.commandsPath) {
        /* 
        Commands folder reading algorithm :
        The function retourn an array of command object, each object contains the name of the command and the Dirent object of the command file

        To clarify, there's two kind of layers : main & sub
        For the main, every .ts files are added in a command object, the command name is the filename without the ext
        For the sub, an entry point file is searched (index.ts) and added to a command object, the command name is the parent folder name

        The function starts to search in the main then search in each sub of the main folder
        */
 
        function createCmd(name: string, file: Dirent): CommandEntry {      // create a command object
            return {
                name: name,
                file: file
            }
        }

        let commands: CommandEntry[] = []
        const commandFiles = await readdir(p, { withFileTypes: true })

        for (const file of commandFiles) {
            if (file.isDirectory() && p === this.commandsPath) {
                commands = commands.concat(await this.getCommands({commandName: this.entryPoint, toLowerCase: true}, path.join(file.parentPath, file.name)))
                continue
            }

            const fileName = settings.toLowerCase ? file.name.replace('.ts', '').toLowerCase() : file.name.replace('.ts', '')
            const parentName = settings.toLowerCase ? path.basename(file.parentPath).toLowerCase() : path.basename(file.parentPath)
            
            if (settings.commandName && fileName === settings.commandName) commands.push(createCmd(parentName, file))               // if the file is an entryPoint, it added to the commands list (recursive mode only)
            if (!settings.commandName && file.name.endsWith('.ts')) commands.push(createCmd(fileName, file))                        // if the fileName end with .ts, it added to the commands list (non recursive)
        }
        return commands 
    }

    async search(expectedName: string) {                                 // search the command among the commands array returned by getCommands()
        const commands = await this.getCommands({toLowerCase: true})
        const command = commands.find(e => e.name === expectedName)
        return command?.file
    }

    async importCommand(expectedName: string, settings?: {noCache?: boolean, file?: Dirent}) {  // import & return the command module that matchs by using search()
        const file = !settings?.file ? await this.search(expectedName) : settings.file          // if settings.file is defined, its used over the search func
        if (file) {
            const filePath = path.join(file.parentPath, file.name)
            const url = !settings?.noCache 
                ? pathToFileURL(filePath).href
                : pathToFileURL(filePath).href + '?update=' + Date.now()
            const module = await import(url)
            return module.default as Command
        }
    }

    async importAllCommands(settings?: {noCache?: boolean}) {
        const commandsArr: Command[] = []
        const commands = await this.getCommands({toLowerCase: true})
        for (const command of commands) {
            const cmdMod = await this.importCommand(command.name, {noCache: settings?.noCache, file: command.file}) 
            if (cmdMod) commandsArr.push(cmdMod)
        }
        return commandsArr
    }

}


// signleton pattern
let instance: CommandsFsUtils

export function cmdFsUtilsInit(config: BotConfig) {
    if (!instance) instance = new CommandsFsUtils(config)
}

export function getCmdFsUtils() {
    if (!instance) throw new Error('CommandsFsUtils not initialized')
    return instance
}