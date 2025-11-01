import * as R from 'result'
import type { ApplicationCommand } from "discord.js"
import type {IAccessHandler} from "../../../../handlers/types/IAccessHandler.ts";
import type { ICommandRegistar } from "../types/ICommandDeclaration.ts";



export class GetCommands {
    constructor(
        private commandRegistar: ICommandRegistar, 
        private accessHandler: IAccessHandler
    ) {}

    async getAll(commandData: CommandData) {
        if (commandData.commandType == 'global') {
            return await this.commandRegistar.getGlobalAll() // return a result pattern directly

        } 
        
        if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            const commandsArray: ApplicationCommand[] = []
            const commandAccess = await this.accessHandler.getCommandAccess(commandData) as Access

            for (const guildId of commandAccess.guildIDs) {
                const result = await this.commandRegistar.getGuildAll(guildId)

                if (result.type === 'err') {
                    console.error(result.error)
                    continue
                }
                commandsArray.push(...result.value)
            }

            return commandsArray.length !== 0 
                ? R.ok<ApplicationCommand[]>(commandsArray)
                : R.err(new Error('Unable to find the commands on the guilds'), commandData) // return an array of commands for each guild
        }
        
        const errStr = `Unable to get the command "${commandData.commandName}"`
        console.error(errStr)
        return R.err(new Error(errStr))
    }


    async get(commandData: CommandData) {
        const result = await this.getAll(commandData)
        if (result.type === 'err') return result

        if (commandData.commandType == 'global') {
            const command = result.value.find(c => c.name === commandData.commandName)
            return command 
                ? R.ok<ApplicationCommand>(command) 
                : R.err(new Error('Unable to found the expected command'))

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            const commands = result.value.filter(c => c.name === commandData.commandName)
            return commands.length
                ? R.ok<ApplicationCommand[]>(commands)
                : R.err(new Error('Unable to find the expected command in the guilds'))
        }
        
        return R.err(new Error('Invalid commandData'))
    }
}
