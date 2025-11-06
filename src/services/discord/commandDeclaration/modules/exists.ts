import * as R from '@/utils/result/index.ts'
import { isArray, isObject } from '@/utils/checkObjectType.ts'
import { UnknownApplicationCommand } from '@/errors/discord/api/discordapi-errors.ts'
import type { IAppCommandExists, IAppCommandGet } from './types/ICommandExists.ts'


export class CommandExists implements IAppCommandExists {
    constructor(
        private getCommand: IAppCommandGet
    ) {}

    async exists(command: ICommandClass) {
        const result = await this.getCommand.get(command)

        if (result.type === 'err' && !(result.error instanceof UnknownApplicationCommand)) { // if the error is unexpected, return
            /* console.error(new Error(`An error has occured while getting the app command "${command.commandName}"`)) */
            return R.ok(false, result) // remake the error recognition system
        }
        

        if (result.type === 'err') return R.ok(false) 

        if (isArray(result.value)) {
            if (result.value.find(cmd => cmd?.name == command.name)) return R.ok(true)
            return R.ok(false)
        } else if (isObject(result.value)) {
            return R.ok(true)
        }

        return R.err(new Error('An error has occured'))
    }
}