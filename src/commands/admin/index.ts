import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types/CommandAb.ts";
import { ICommandsFsUtils, IErrorManager } from "@/handlers/types/ICommandHandler.ts";
import buildCommand from "./utils/build-command.ts";
import { ICommandDeclaration } from "@/bootstrap/types/ISlashCmdInit.ts";
import { IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts";
import { GenericCmdErr } from "@/errors/showable/command-errors.ts";

export const deps = ['CommandsFsUtils', 'CommandDeclaration', 'EmbedTemplatesBuilder', 'ErrorManager']

type Dependencies = {
    commandFsUtils: ICommandsFsUtils;
    commandDeclaration: ICommandDeclaration;
    embedTemplatesBuilder: IEmbedTemplatesBuilder;
    errorManager: IErrorManager;
}

export default class Admin extends Command {
    static name = 'admin'
    static description = 'Admin commands (private)'
    static accessLevel: AccessLevel = 'private'
    static commandType: CommandType = 'global'
    static slashCommandBuilder = buildCommand(new SlashCommandBuilder().setName(Admin.name).setDescription(Admin.description))
    private deps: Dependencies

    constructor(
        private commandFsUtils: ICommandsFsUtils,
        private commandDeclaration: ICommandDeclaration,
        private embedTemplatesBuilder: IEmbedTemplatesBuilder,
        private errorManager: IErrorManager
    ) {
        super()
        this.deps = {
            commandFsUtils: this.commandFsUtils,
            commandDeclaration: this.commandDeclaration,
            embedTemplatesBuilder: this.embedTemplatesBuilder,
            errorManager: this.errorManager
        }
    }

    private async getAllCommands() {
        return await this.commandFsUtils.importAllCommands({noCache: true})
    }

    private async returnError(msg: string, interaction: ChatInputCommandInteraction) {
        this.errorManager.manage(new GenericCmdErr({
            msg: msg,
            interaction: interaction
        }), {embed: false, defered: true})
    }

    private async returnSuccess(msg: string, interaction: ChatInputCommandInteraction) {
        interaction.followUp(msg)
    }

    private async removeAllCommands(rmvadmin: boolean | null, interaction: ChatInputCommandInteraction) {
        for (const command of await this.getAllCommands()) {
            const commandData = command.default

            if (commandData.name === Admin.name && !rmvadmin) continue
            
            const existResult = await this.commandDeclaration.exists(commandData)

            if (existResult.type === 'ok' && existResult.value === true) {
                const result = await this.commandDeclaration.remove(commandData)

                if (result.type === 'ok') this.returnSuccess(`${commandData.commandType} command "${commandData.name}" removed`, interaction)
                if (result.type === 'err') this.returnError(`Unable to remove ${commandData.commandType} command "${commandData.name}"`, interaction)
            }
            if (existResult.type === 'err') {
                console.error(existResult.error)
            }
        }
    }

    private async addAllCommands(interaction: ChatInputCommandInteraction) {
        for (const command of await this.getAllCommands()) {
            const commandData = command.default

            const existResult = await this.commandDeclaration.exists(commandData)

            if (existResult.type === 'ok' && existResult.value === false) {
                const result = await this.commandDeclaration.add(commandData)

                if (result.type === 'ok') this.returnSuccess(`${commandData.commandType} command "${commandData.name}" declared`, interaction)
                if (result.type === 'err') this.returnError(`Unable to add ${commandData.commandType} command "${commandData.name}"`, interaction)
            }
            if (existResult.type === 'err') {
                console.error(existResult.error)
            }
        }
    }

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply()
        const sub = interaction.options.getSubcommand()

        if (sub === 'rmvcommand' && interaction.options.getBoolean('all')) this.removeAllCommands(interaction.options.getBoolean('rmvadmincmd'), interaction)
        if (sub === 'addcommand' && interaction.options.getBoolean('all')) this.addAllCommands(interaction)
    }
}