import type {Dirent} from 'fs'
export type {Dirent}

export type GetCommandsSettings = {
    commandName?: string
    toLowerCase?: boolean
    newPath?: string
}

export type CommandEntry = {
    name: string
    file: Dirent
}

export type CreateCmd = (name: string, file: Dirent) => CommandEntry

export interface ICommandsFsUtils {
    
    getCommands: (settings: GetCommandsSettings, p: string) => Promise<CommandEntry[]>
    search: (expectedName: string) => Promise<Dirent | undefined>
    importCommand: (expectedName: string, settings?: {noCache?: boolean, file?: Dirent}) => Promise<Command | undefined>
    importAllCommands: (settings?: {noCache?: boolean}) => Promise<Command[]>
}