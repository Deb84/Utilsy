import { isArray } from "@/utils/checkObjectType.ts";
import * as R from 'result'
import type { IAppCommandRemove, IAppCommandGet, ICommandRegistar, APIApplicationCommand } from "./types/ICommandRemove.ts";



export class RemoveCommand implements IAppCommandRemove {
    constructor(
        private getCommand: IAppCommandGet,
        private commandRegistar: ICommandRegistar,
    ) {}


    async remove(commandData: CommandData) {
        if (commandData.commandType == 'global' ) {
            const errStr = `Unable to remove the global command ${commandData.commandName}`
            const result = await this.getCommand.get(commandData)
            if (result.type === 'err') {
                console.error(`${errStr} (get failure)`)
                return result
            }

            const command = result.value
            let rmvResult: Result | null = null

            if (command && !isArray(command)) {
                rmvResult = await this.commandRegistar.removeGlobal(command.id)
            }
            
            if (rmvResult?.type === 'ok') {
                console.log(`Request sent to the Discord REST API to remove "${commandData.commandName}" global slash command`)
                return R.ok(rmvResult)
            }
            
            console.error(errStr)
            return R.err(new Error(errStr))

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            // a guild command, if added on mutliple guild, can have multiple instances with different ids, get() get them

            const errStr = `Unable to remove the guild command ${commandData.commandName}`
            let result = await this.getCommand.get(commandData)

            if (result.type === 'err') {
                console.error(`${errStr} (get failure)`)
                return result
            }

            const commands = result.value as APIApplicationCommand[]
            let rmvResults: Result[] = []

            if (commands && isArray(commands)) { 
                for (const command of commands) { 
                    if (!command.guild_id) continue

                    const rmvResult = await this.commandRegistar.removeGuild(command.guild_id, command.id)
                    rmvResults.push(rmvResult)
                    
                    if (rmvResult.type === 'ok') console.log(`Request sent to the Discord REST API to remove "${commandData.commandName}" guild slash command for the guild ${command.guild_id}`)
                    continue
                }
            }

            if (rmvResults.length !== 0) return R.ok<Result[]>(rmvResults)
            return R.err(new Error(`${errStr} (commands seems not exists)`))
        }

        return R.err(new Error('An unknown Error has occured'))
    }
}