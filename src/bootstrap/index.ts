// extern imports
import { Container  } from "inversify"
import { Client, REST } from "discord.js"

// error & logging imports
import { DiscordApiCodeErrResolver } from "../errors/discord/api/discordapi-err-code-resolver.ts"

// clients imports
import { RestClient, type IRestClient } from "../services/discord/api/restClient/rest-client.ts"

// handlers imports
import { AccessHandler, type IAccessHandler } from "../handlers/accessHandler.ts"
import {EventHandler, type IEventHandlers} from "../handlers/eventHandler.ts"
import {InteractionHandler, type IInteractionHandler} from "../handlers/interactionHandler.ts"
import { CommandHandler, type ICommandHandler } from "../handlers/commandHandler.ts"

// services imports
import { discordInfos } from "@/services/discord/discordInfos/discordInfos.ts"
import { CommandDeclaration, type ICommandDeclaration } from "../services/discord/commandDeclaration/command-declaration.ts"
import { CommandRegistar, type ICommandRegistar } from "../services/discord/index.ts"

// utils imports
import {CommandsFsUtils} from '../utils/fsUtils/CommandsFsUtils.ts'
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { slashCmdAutoBuilderInit } from "../utils/slashCommandBuilder/slashCmdAutoBuilder.ts"

// init imports
import {SlashCommandInit, type ISlashCmdInit} from "./slashCmdInit.ts"

// configs imports
import { config } from "../config/index.ts"


export default async () => {
    const container = new Container({defaultScope: "Singleton"})
    const c = container // be explicit first, minimise after

    // create the clients
    const client = new Client({intents: config.intents})
    const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

    // Errors & logging
    c.bind('DiscordErrorResolver').toDynamicValue(() => new DiscordApiCodeErrResolver())

    //Clients
    c.bind<Client>('Client').toConstantValue(client)
    c.bind<IRestClient>('RestClient').toDynamicValue(() => new RestClient(rest, c.get('DiscordErrorResolver')))

    // Utils
    c.bind('CommandsFsUtils').toDynamicValue(() => new CommandsFsUtils(config))

    // Handlers
    c.bind<IAccessHandler>('AccessHandler').toDynamicValue(() => new AccessHandler(config))

    c.bind<ICommandHandler>('CommandHandler').toDynamicValue(() => new CommandHandler(c.get('CommandsFsUtils'), c.get<IAccessHandler>('AccessHandler'), client, container))

    c.bind<IInteractionHandler>('InteractionHandler').toDynamicValue(() => new InteractionHandler(c.get<ICommandHandler>('CommandHandler')))

    c.bind<IEventHandlers>('EventHandler').toDynamicValue(() => new EventHandler(config, client, container))

    // services
    c.bind<ICommandRegistar>('CommandRegistar').toDynamicValue(() => new CommandRegistar(c.get<IRestClient>('RestClient'), config.env))
    c.bind<ICommandDeclaration>('CommandDeclaration').toDynamicValue(() => new CommandDeclaration(c.get<ICommandRegistar>('CommandRegistar'), c.get<IAccessHandler>('AccessHandler')))
    c.bind<ISlashCmdInit>('SlashCommandInit').toDynamicValue(() => new SlashCommandInit(c.get('CommandsFsUtils'), c.get<ICommandDeclaration>('CommandDeclaration')))

    c.bind('DiscordInfos').toDynamicValue(() => new discordInfos(client))


    // exe

    c.get<IEventHandlers>('EventHandler').handle()

    c.get<ISlashCmdInit>('SlashCommandInit').declare()
    // discord infos
    embedBuildInit(config)
    slashCmdAutoBuilderInit()




    //discord client init
    try {
        await client.login(config.env.AUTH)
    } catch {
        process.exit
    }

}