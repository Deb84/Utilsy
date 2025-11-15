import * as R from 'result'
import { AccessModel, AccessScope, CommandInteraction } from "../types/IAccessResolver.ts";

export async function resolveCommandAccess(config: BotConfig, command: ICommandClass) {
    const { accessConfig } = await config.globalConfig()
    const accessLevel = command.accessLevel
    return R.ok(accessConfig[accessLevel])
}

export async function hasCommandAccess(
    accessModel: AccessModel, 
    config: BotConfig, 
    interaction: CommandInteraction, 
    command: ICommandClass
) {
    const { accessConfig, accessState } = await config.globalConfig()

        const botAccessScope = accessModel[accessState] // pick the bot access state in the matrix
        const commandAccessScope = botAccessScope[command.accessLevel] // pick the command access state in the matrix

        if (typeof commandAccessScope === 'boolean') return R.ok(commandAccessScope) // return the value if its a bool

        const key = commandAccessScope as AccessScope
        const commandACL = accessConfig[key] // get the ACL array of the scope

        console.log('botAccessScope')
        console.log(botAccessScope)

        console.log('commandAccessScope')
        console.log(commandAccessScope)

        console.log('key')
        console.log(key)

        console.log('commandACL')
        console.log(commandACL)


        if (interaction.guildId && commandACL.guildIDs.includes(interaction.guildId)) {
            console.log('a')
            return R.ok(true)
        }
        if (interaction.user.id && commandACL.userIDs.includes(interaction.user.id)) {
            console.log('b')
            console.log(interaction.user.id)

            return R.ok(true)
        }
        console.log('false')
        return R.ok(false)
}