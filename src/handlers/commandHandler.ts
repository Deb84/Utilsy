
import type { 
    ICommandHandler, 
    IAccessHandler, 
    ICommandsFsUtils, 
    Client, 
    ChatInputCommandInteraction 
} from "./types/ICommandHandler.ts";
export type {ICommandHandler}

// utilser client.command.set

export class CommandHandler implements ICommandHandler {
    private commandsFsUtils: ICommandsFsUtils
    private accessHandler: IAccessHandler
    private client: Client

    constructor(commandsFsUtils: ICommandsFsUtils, accessHandler: IAccessHandler, client: Client) {
        this.commandsFsUtils = commandsFsUtils
        this.accessHandler = accessHandler
        this.client = client
    }


    async handle(commandInteraction: ChatInputCommandInteraction) {
        const expectedName = commandInteraction.commandName
        const command = await this.commandsFsUtils.importCommand(expectedName)
        if (command) {
            if (await this.accessHandler.hasCommandAccess(commandInteraction, command.data.accessLevel)) {
                command.execute(commandInteraction)
            } else {
                commandInteraction.reply("you don't have access to this")
            }
        }
    }
}