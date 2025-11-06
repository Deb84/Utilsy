import * as R from 'result'
import type { IAppCommandGet, APIApplicationCommand, ICommandRegistar, IAccessHandler } from './types/ICommandGet.ts'



export class GetCommand implements IAppCommandGet {
    constructor(
        private commandRegistar: ICommandRegistar, 
        private accessHandler: IAccessHandler
    ) {}

    // need to refactor the params 
    async getAll(command: ICommandClass) {
        if (command.commandType == 'global') {
            return await this.commandRegistar.getGlobalAll() // return a result pattern directly

        } 
        
        if (command.commandType == 'guild' && command.accessLevel !== 'public') {
            const commandsArray: APIApplicationCommand[] = []
            const commandAccess = await this.accessHandler.getCommandAccess(command) as Access

            for (const guildId of commandAccess.guildIDs) {
                const result = await this.commandRegistar.getGuildAll(guildId)

                if (result.type === 'err') {
                    console.error(result.error)
                    continue
                }
                commandsArray.push(...result.value)
            }

            return commandsArray.length !== 0 
                ? R.ok<APIApplicationCommand[]>(commandsArray)
                : R.err(new Error('Unable to find the commands on the guilds'), command) // return an array of commands for each guild
        }

        const errStr = `Unable to get the cmd "${command.name}"`
        console.error(errStr)
        return R.err(new Error(errStr))
    }


    async get(command: ICommandClass) {
        const result = await this.getAll(command)
        if (result.type === 'err') return result

        if (command.commandType == 'global') {
            const cmd = result.value.find(c => c.name === command.name)
            return cmd 
                ? R.ok<APIApplicationCommand>(cmd) 
                : R.err(new Error('Unable to found the expected cmd'))

        } else if (command.commandType == 'guild' && command.accessLevel !== 'public') {
            const commands = result.value.filter(c => c.name === command.name)
            return commands.length
                ? R.ok<APIApplicationCommand[]>(commands)
                : R.err(new Error('Unable to find the expected cmd in the guilds'))
        }
        
        return R.err(new Error('Invalid command'))
    }
}
