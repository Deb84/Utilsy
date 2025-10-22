import addCommand from './add.ts'
import removeCommand from './remove.ts'
import getCommand from './get.ts'
import { REST } from 'discord.js'
import type { APIApplicationCommand } from "discord.js"
import type { CommandData } from '../../types/enums.types.ts'

const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

export function add(commandData: CommandData) {
    return addCommand(rest, commandData)
}

export function remove(commandData: CommandData, command: APIApplicationCommand) {
    return removeCommand(rest, commandData, command)
}

export function get(commandData: CommandData) {
    return getCommand(rest, commandData)
}