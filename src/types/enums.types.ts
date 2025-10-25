import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js"

// global enums
export type AccessLevel = 'private' | 'test' | 'public' // defines who have access to

export interface Access { // define the shape of access
    readonly userIDs: string[]
    readonly guildIDs: string[]
}

// config
export interface AccessConfig {
    readonly private: Access
    readonly test: Access
    readonly public: 'public' // not needed, if the access value is null, everyone has access
}

export interface Paths {
    events: string
    commands: string
}

// commands enums
export type CommandType = 'guild' | 'global'

export interface CommandData {
    commandName: string
    description: string
    accessLevel: AccessLevel
    commandType: CommandType
    slashCommandBuild?: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
}

export interface Command {
    data: CommandData
    execute: (interaction: CommandInteraction) => Promise<void>
}