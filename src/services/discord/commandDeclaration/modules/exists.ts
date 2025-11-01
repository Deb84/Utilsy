import {get} from './get.ts'
import { isArray, isObject } from '../../../../utils/checkObjectType.ts'
import type {IAccessHandler} from '../../../../handlers/types/IAccessHandler.ts'

export default async (accessHandler: IAccessHandler, commandData: CommandData) => {
    const cmds = await get(rest, accessHandler, commandData)
    if (isArray(cmds)) {
        if (cmds.find(cmd => cmd?.name == commandData.commandName)) return true
        return false
    } else if (isObject(cmds)) {
        return true
    }
    return false
}