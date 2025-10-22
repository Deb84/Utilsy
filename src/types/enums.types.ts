import { SlashCommandBuilder } from "discord.js"

// global enums
export type AccessState = 'private' | 'test' | 'public'

export interface Access {
    readonly userIDs: string[]
    readonly guildIDs: string[]
}

// config
export interface AccessConfig {
    readonly private: Access
    readonly test: Access
    readonly public: null
}

// commands enums
export type CommandType = 'guild' | 'global'

export interface CommandData {
    accessState: AccessState
    commandType: CommandType
    access?: Access | null
    slashCommandBuild?: SlashCommandBuilder
}