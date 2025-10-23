import { REST } from 'discord.js'
import type { CommandData } from '../../types/enums.types.ts'
import get from './get.ts'

export default async (rest: REST, commandData: CommandData) => {
    if (await get(rest, commandData)) {
        return true
    }
    return false
}