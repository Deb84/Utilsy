import { REST } from 'discord.js'
import get from './get.ts'
import { isArray, isObject } from '../../utils/checkObjectType.ts'
import type { CommandData } from '../../types/enums.types.ts'

export default async (rest: REST, commandData: CommandData) => {
    const cmds = await get(rest, commandData)
    if (isArray(cmds)) {
        if (cmds.find(cmd => cmd?.name == commandData.commandName)) return true
        return false
    } else if (isObject(cmds)) {
        return true
    }
    return false
}