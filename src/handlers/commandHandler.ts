import { NoPermissionCmd } from "@/errors/showable/command-errors.ts";
import type { 
    ICommandHandler, 
    IAccessHandler, 
    ICommandsFsUtils, 
    IErrorManager,
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
        private container: Container
    ) {}


    async handle(commandInteraction: ChatInputCommandInteraction) {
        const expectedName = commandInteraction.commandName
        const command = await this.commandsFsUtils.importCommand(expectedName, {noCache: true})

        if (command) {
            
            let deps: any[] = []
            if (command.deps) {
                deps = command.deps.map(dep => this.container.get(dep))
            }
            
            const cls = new command.default(...deps)

            const hasCommandAccessResult = await this.accessHandler.hasCommandAccess(commandInteraction, command.default)
            if (hasCommandAccessResult.type === 'ok' && hasCommandAccessResult.value) {
                cls.execute(commandInteraction)
                
            } else { // No access
                const err = new NoPermissionCmd({
                    interaction: commandInteraction
                })
                this.errorManager.manage(err) 
            }
        }
    }
}