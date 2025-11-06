import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, CommandInteraction } from "discord.js"

export abstract class Command {
        static name: string
        static description: string
        static accessLevel: AccessLevel
        static commandType: CommandType
        static slashCommandBuild?: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
        abstract execute(interaction: CommandInteraction): Promise<void>
    }