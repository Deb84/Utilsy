import * as R from 'result'
import { IAppCommandAdd, IAccessHandler, ICommandRegistar } from './types/ICommandAdd.ts'


export class AddCommand implements IAppCommandAdd {
    constructor(
        private commandRegistar: ICommandRegistar,
        private accessHandler: IAccessHandler
    ) {}

    async add(commandData: CommandData) {
        if (commandData.commandType == 'global' ) {
            const result = await this.commandRegistar.registerGlobal(commandData.slashCommandBuild?.toJSON())

            if (result.type === 'ok') console.log(`"${commandData.commandName}" declared at Discord REST API as a global slash command`)
            return result // no need to recreate a result

        } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
            const results: Result[] = []
            const commandAccess = await this.accessHandler.getCommandAccess(commandData) as Access

            for (const guildId of commandAccess.guildIDs) {
                const result = await this.commandRegistar.registerGuild(commandData.slashCommandBuild?.toJSON(), guildId)
                if (result.type === 'ok') console.log(`"${commandData.commandName}" declared at Discord REST API as a guild slash command for guild ${guildId}`)
                results.push(result)
            }
            
            if (results.length !== 0) return R.ok<Result[]>(results)
            return R.err(new Error('No results, no commands declared for guilds'), commandData)
        }

        return R.err(new Error('Unable to add the command'), commandData)
    }
}