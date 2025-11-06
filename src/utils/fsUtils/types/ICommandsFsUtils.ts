import type {Dirent} from 'fs'
import {ICommand} from '@/commands/types/ICommand.ts'
export type {Dirent, ICommand}

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
    importCommand: (expectedName: string, settings?: {noCache?: boolean, file?: Dirent}) => Promise<ICommand | undefined>
    importAllCommands: (settings?: {noCache?: boolean}) => Promise<ICommand[]>
}