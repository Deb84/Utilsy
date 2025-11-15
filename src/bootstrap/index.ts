// extern imports
import { Container  } from "inversify"
import { Client, REST } from "discord.js"

// error & logging imports
import { DiscordApiCodeErrResolver } from "../errors/discord/api/discordapi-err-code-resolver.ts"

// clients imports
import { RestClient, type IRestClient } from "../services/discord/api/restClient/rest-client.ts"

// managers imports
import { ErrorManager } from "@/managers/error-manager.ts"

// handlers imports
import { AccessHandler, type IAccessHandler } from "../handlers/accessHandler.ts"
import { EventHandler, type IEventHandlers } from "../handlers/eventHandler.ts"
import { InteractionHandler, type IInteractionHandler } from "../handlers/interactionHandler.ts"
import { CommandHandler, type ICommandHandler } from "../handlers/commandHandler.ts"

// services imports
import { AccessResolver, type IAccessResolver } from "@/services/accessResolver/access-resolver.ts"
import { DiscordInfos } from "@/services/discord/discordInfos/discordInfos.ts"
import { CommandDeclaration, type ICommandDeclaration } from "../services/discord/commandDeclaration/command-declaration.ts"
import { CommandRegistar, type ICommandRegistar } from "../services/discord/index.ts"
import { ErrorReplyer } from "@/services/discord/errorReplyer/error-replyer.ts"

// utils imports
import { CommandsFsUtils } from '../utils/fsUtils/CommandsFsUtils.ts'
import { EmbedTemplatesBuilder, type IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts"

// init imports
import { CommandDeclarationInit, type ICommandDeclarationInit } from "./CommandDeclarationInit.ts"

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

    c.bind<IEmbedTemplatesBuilder>('EmbedTemplatesBuilder').toDynamicValue(() => new EmbedTemplatesBuilder(config))

    // services
    c.bind<IAccessResolver>('AccessResolver').toDynamicValue(() => new AccessResolver(config))

    // Errors
    c.bind('ErrorReplyer').toDynamicValue(() => new ErrorReplyer(c.get('EmbedTemplatesBuilder')))
    c.bind('ErrorManager').toDynamicValue(() => new ErrorManager(c.get('ErrorReplyer')))

    // Handlers
    c.bind<IAccessHandler>('AccessHandler').toDynamicValue(() => new AccessHandler(c.get('AccessResolver')))

    c.bind<ICommandHandler>('CommandHandler').toDynamicValue(() => new CommandHandler(c.get('CommandsFsUtils'), c.get<IAccessHandler>('AccessHandler'), c.get('ErrorManager'), client, container))

    c.bind<IInteractionHandler>('InteractionHandler').toDynamicValue(() => new InteractionHandler(c.get<ICommandHandler>('CommandHandler')))

    c.bind<IEventHandlers>('EventHandler').toDynamicValue(() => new EventHandler(config, client, container))

    // services
    c.bind<ICommandRegistar>('CommandRegistar').toDynamicValue(() => new CommandRegistar(c.get<IRestClient>('RestClient'), config.env))
    c.bind<ICommandDeclaration>('CommandDeclaration').toDynamicValue(() => new CommandDeclaration(c.get<ICommandRegistar>('CommandRegistar'), c.get<IAccessHandler>('AccessHandler')))
    c.bind<ICommandDeclarationInit>('CommandDeclarationInit').toDynamicValue(() => new CommandDeclarationInit(c.get('CommandsFsUtils'), c.get<ICommandDeclaration>('CommandDeclaration')))

    c.bind('DiscordInfos').toDynamicValue(() => new DiscordInfos(client))


    // exe

    c.get<IEventHandlers>('EventHandler').handle()

    c.get<ICommandDeclarationInit>('CommandDeclarationInit').declare()




    //discord client init
    try {
        await client.login(config.env.AUTH)
    } catch {
        process.exit
    }

}