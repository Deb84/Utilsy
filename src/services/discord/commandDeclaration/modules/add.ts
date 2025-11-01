import * as R from 'result'
import type { IAccessHandler } from "@/handlers/accessHandler.ts";
import { ICommandRegistar } from "../types/ICommandDeclaration.ts";


export default async (commandRegistar: ICommandRegistar, accessHandler: IAccessHandler, commandData: CommandData) => {
    if (commandData.commandType == 'global' ) {
        const result = await commandRegistar.registerGlobal(commandData.slashCommandBuild?.toJSON())

        if (result.type === 'ok') console.log(`"${commandData.commandName}" declared at Discord REST API as a global slash command`)
        return result

    } else if (commandData.commandType == 'guild' && commandData.accessLevel !== 'public') {
        const results = []
        const commandAccess = await accessHandler.getCommandAccess(commandData) as Access

        for (const guildId of commandAccess.guildIDs) {
            const result = await commandRegistar.registerGuild(commandData.slashCommandBuild?.toJSON(), guildId)
            if (result.type === 'ok') console.log(`"${commandData.commandName}" declared at Discord REST API as a guild slash command for guild ${guildId}`)
            results.push(result)
        }
        
        if (results.length !== 0) return R.ok(results as Result[])
        return R.err(new Error('No results, no commands declared for guilds'), commandData)
    }
}