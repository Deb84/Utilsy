import { isArray } from "../../../../utils/checkObjectType.ts";
import * as R from '../../../../utils/result/index.ts'
import type { IAppCommandRemove, IAppCommandGet, ICommandRegistar, APIApplicationCommand } from "./types/ICommandRemove.ts";



export class RemoveCommand implements IAppCommandRemove {
    constructor(
        private getCommand: IAppCommandGet,
        private commandRegistar: ICommandRegistar,
    ) {}


    async remove(command: ICommandClass) {
        if (command.commandType == 'global' ) {
            const errStr = `Unable to remove the global cmd ${command.name}`
            const result = await this.getCommand.get(command)
            if (result.type === 'err') {
                console.error(`${errStr} (get failure)`)
                return result
            }

            const cmd = result.value
            let rmvResult: Result | null = null

            if (cmd && !isArray(cmd)) {
                rmvResult = await this.commandRegistar.removeGlobal(cmd.id)
            }
            
            if (rmvResult?.type === 'ok') {
                console.log(`Request sent to the Discord REST API to remove "${command.name}" global slash cmd`)
                return R.ok(rmvResult)
            }
            
            console.error(errStr)
            return R.err(new Error(errStr))

        } else if (command.commandType == 'guild' && command.accessLevel !== 'public') {
            // a guild cmd, if added on mutliple guild, can have multiple instances with different ids, get() get them

            const errStr = `Unable to remove the guild cmd ${command.name}`
            let result = await this.getCommand.get(command)

            if (result.type === 'err') {
                console.error(`${errStr} (get failure)`)
                return result
            }

            const commands = result.value as APIApplicationCommand[]
            let rmvResults: Result[] = []

            if (commands && isArray(commands)) { 
                for (const cmd of commands) { 
                    if (!cmd.guild_id) continue

                    const rmvResult = await this.commandRegistar.removeGuild(cmd.guild_id, cmd.id)
                    rmvResults.push(rmvResult)
                    
                    if (rmvResult.type === 'ok') console.log(`Request sent to the Discord REST API to remove "${command.name}" guild slash cmd for the guild ${cmd.guild_id}`)
                    continue
                }
            }

            if (rmvResults.length !== 0) return R.ok<Result[]>(rmvResults)
            return R.err(new Error(`${errStr} (commands seems not exists)`))
        }

        return R.err(new Error('An unknown Error has occured'))
    }
}