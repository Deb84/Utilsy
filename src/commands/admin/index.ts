import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types/CommandAb.ts";
import { ICommandsFsUtils } from "@/handlers/types/ICommandHandler.ts";
import buildCommand from "./utils/build-command.ts";
import { ICommandDeclaration } from "@/bootstrap/types/ISlashCmdInit.ts";

export const deps = ['CommandsFsUtils', 'CommandDeclaration']

type Dependencies = {
    commandFsUtils: ICommandsFsUtils;
    commandDeclaration: ICommandDeclaration;
}

export default class Admin extends Command {
    static name = 'admin'
    static description = 'Admin commands (private)'
    static accessLevel: AccessLevel = 'private'
    static commandType: CommandType = 'guild'
    static slashCommandBuilder = buildCommand(new SlashCommandBuilder().setName(Admin.name).setDescription(Admin.description))
    private deps: Dependencies

    constructor(
        private commandFsUtils: ICommandsFsUtils,
        private commandDeclaration: ICommandDeclaration
    ) {
        super()
        this.deps = {
            commandFsUtils: this.commandFsUtils,
            commandDeclaration: this.commandDeclaration
        }
    }

    private async removeAllCommand() {
        const commands = await this.commandFsUtils.importAllCommands({noCache: true})

        for (const command of commands) {
            const commandData = command.default

            const existResult = await this.commandDeclaration.exists(commandData)

            if (existResult.type === 'ok' && existResult.value === true) {
                this.commandDeclaration.remove(commandData)
            }
            if (existResult.type === 'err') {
                console.error(existResult.error)
            }
        }
    }

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const sub = interaction.options.getSubcommand()

        if (sub === 'rmvcommand' && interaction.options.getBoolean('all')) this.removeAllCommand()
    }
}