import type { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js"
import intents from "./config/intents.ts"
import { Command } from "./commands/types/CommandAb.ts"

declare global {
    // global enums
    export type AccessLevel = 'private' | 'test' | 'public' // defines who have access to

    export interface Access { // define the shape of access
        readonly userIDs: string[]
        readonly guildIDs: string[]
    }

    // result pattern
    export type Result<T = unknown, C = unknown, E = Error> =
  | { type: 'ok'; value: T; context?: C}
  | { type: 'err'; error: E; context?: C }
    
    // config // env
    interface Environment {
        readonly APPID: string
        readonly AUTH: string
    }

    // config
    export interface AccessConfig {
        readonly private: Access
        readonly test: Access
        readonly public: 'public' // not needed, if the access value is null, everyone has access
    }
    // config paths
    export interface Paths {
        events: string
        commands: string
        embedTemplates: string
    }
    // config global
    interface GlobalConfig {
        botName: string
        mainColor: `#${string}`
        author: string
        accessState: AccessLevel
        accessConfig: AccessConfig
    }

    // CONFIG
    export interface BotConfig {
        env: Environment
        intents: typeof intents
        paths: Paths
        globalConfig: () => Promise<GlobalConfig>
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

    export interface ICommandClass {
        new (...args: any[]): Command;
        name: string;
        description: string;
        accessLevel: AccessLevel;
        commandType: CommandType;
        slashCommandBuilder?: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    }


    export interface CommandModule {
        default: Command
    }
}