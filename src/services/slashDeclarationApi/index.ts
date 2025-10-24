import addCommand from './add.ts'
import removeCommand from './remove.ts'
import getCommand from './get.ts'
import existsCommand from './exists.ts'
import { REST } from 'discord.js'
import type { APIApplicationCommand } from "discord.js"
import type { CommandData } from '../../types/enums.types.ts'
import dotenv from 'dotenv'; // to remove
dotenv.config(); // to remove
const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

export function add(commandData: CommandData) {
    return addCommand(rest, commandData)
}

export function remove(commandData: CommandData) {
    return removeCommand(rest, commandData)
}

export function get(commandData: CommandData) {
    return getCommand(rest, commandData)
}

export function exists(commandData: CommandData) {
    return existsCommand(rest, commandData)
}