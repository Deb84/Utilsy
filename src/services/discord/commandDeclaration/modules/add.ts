import * as R from 'result'
import type { IAppCommandAdd, IAccessHandler, ICommandRegistar } from './types/ICommandAdd.ts'


export class AddCommand implements IAppCommandAdd {
    constructor(
        private commandRegistar: ICommandRegistar,
        private accessHandler: IAccessHandler
    ) {}

    async add(command: ICommandClass) {
        if (command.commandType == 'global' ) {
            const result = await this.commandRegistar.registerGlobal(command.slashCommandBuilder?.toJSON())

            if (result.type === 'ok') console.log(`"${command.name}" declared at Discord REST API as a global slash command`)
            return R.ok(command, result) // no need to recreate a result

        } else if (command.commandType == 'guild' && command.accessLevel !== 'public') {
            const results: Result[] = []
            const resolveCommandAccessResult = await this.accessHandler.resolveCommandAccess(command)
            
            if (resolveCommandAccessResult.type === 'err') return R.err(new Error('err ici')) // to build
            const commandAccess = resolveCommandAccessResult.value as Access

            for (const guildId of commandAccess.guildIDs) {
                const result = await this.commandRegistar.registerGuild(command.slashCommandBuilder?.toJSON(), guildId)
                if (result.type === 'ok') console.log(`"${command.name}" declared at Discord REST API as a guild slash command for guild ${guildId}`)
                results.push(result)
            }
            
            if (results.length !== 0) return R.ok<ICommandClass, Result[]>(command, results)
            return R.err(new Error('No results, no commands declared for guilds'), command)
        }

        return R.err(new Error('Unable to add the command'), command)
    }
}