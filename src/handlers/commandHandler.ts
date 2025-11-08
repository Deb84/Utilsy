import { NoPermissionCmd } from "@/errors/showable/command-errors.ts";
import type { 
    ICommandHandler, 
    IAccessHandler, 
    ICommandsFsUtils, 
    IErrorManager,
    Client, 
    ChatInputCommandInteraction,
    Container
} from "./types/ICommandHandler.ts";
export type {ICommandHandler}

// utilser client.command.set

export class CommandHandler implements ICommandHandler {


    constructor(
        private commandsFsUtils: ICommandsFsUtils, 
        private accessHandler: IAccessHandler, 
        private errorManager: IErrorManager,
        private client: Client,
        private container: Container
    ) {
        this.commandsFsUtils = commandsFsUtils
        this.accessHandler = accessHandler
        this.client = client
    }


    async handle(commandInteraction: ChatInputCommandInteraction) {
        const expectedName = commandInteraction.commandName
        const command = await this.commandsFsUtils.importCommand(expectedName)

        if (command) {

            const deps = []
                if (command.deps) {
                    for (const dep of command.deps) {
                        deps.push(this.container.get(dep))
                    }
                }

            const cls = new command.default(...deps)

            
            if (await this.accessHandler.hasCommandAccess(commandInteraction, command.default.accessLevel)) {
                cls.execute(commandInteraction)
            } else { // No access
                const err = new NoPermissionCmd({
                    commandName: command.default.name,
                    userId: commandInteraction.user.id,
                    interaction: commandInteraction
                })
                this.errorManager.manage(err) 
            }
        }
    }
}