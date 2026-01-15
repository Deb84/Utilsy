// extern imports
import { Container, injectable  } from "inversify"
import { Client, REST } from "discord.js"

// bootsrap types
import type { ActiveCustomIdRegistry, InteractionCallbackRegistry } from "./types/RegistryTypes.ts"

// error & logging imports
import { DiscordApiCodeErrResolver } from "@/errors/discord/api/discordapi-err-code-resolver.ts"

// clients imports
import { RestClient, type IRestClient } from "../services/discord/api/restClient/rest-client.ts"

// managers imports
import { ErrorManager } from "@/managers/error-manager.ts"

// handlers imports
import { AccessHandler, type IAccessHandler } from "../handlers/accessHandler.ts"
import { EventHandler, type IEventHandlers } from "../handlers/eventHandler.ts"
import { InteractionHandler, type IInteractionHandler } from "../handlers/interaction/interactionHandler.ts"
import { CommandHandler, type ICommandHandler } from "../handlers/commandHandler.ts"

// services imports
import { AccessResolver, type IAccessResolver } from "@/services/accessResolver/access-resolver.ts"
import { DiscordInfos } from "@/services/discord/discordInfos/discordInfos.ts"
import { CommandDeclaration, type ICommandDeclaration } from "../services/discord/commandDeclaration/command-declaration.ts"
import { CommandRegistar, type ICommandRegistar } from "../services/discord/index.ts"
import { ErrorReplyer } from "@/services/discord/errorReplyer/error-replyer.ts"
import { CustomIdGenerator, type ICustomIdGenerator } from "@/services/generators/customIdGenerator/customId-generator.ts"

// utils imports
import { CommandsFsUtils } from '@/utils/fsUtils/CommandsFsUtils.ts'
import { EmbedTemplatesBuilder, type IEmbedTemplatesBuilder } from "@/utils/discord/embedBuilder/embed-templates-builder.ts"
import { MapRegistry, SetRegistry } from "@/utils/registry/registry.ts"
import { PagedEmbedController } from "@/utils/discord/pagedEmbedController/paged-embed-controller.ts"

// init imports
import { CommandDeclarationInit, type ICommandDeclarationInit } from "./CommandDeclarationInit.ts"

// configs imports
import { config } from "@/config/index.ts"
import { PagedEmbedFactory } from "@/utils/discord/pagedEmbedController/paged-embed-factory.ts"


export default async () => {
    const container = new Container({defaultScope: "Singleton"})
    const c = container // be explicit first, minimise after

    // create the clients
    const client = new Client({intents: config.intents})
    const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

    //registry
    const activeCustomIdRegistry: ActiveCustomIdRegistry = new SetRegistry<string>()
    const interactionCallbackRegistry: InteractionCallbackRegistry = new MapRegistry<string, Callback<unknown>>()

    // Errors & logging
    c.bind('DiscordErrorResolver').toDynamicValue(() => new DiscordApiCodeErrResolver())

    //Clients
    c.bind<Client>('Client').toConstantValue(client)
    c.bind<IRestClient>('RestClient').toDynamicValue(() => new RestClient(rest, c.get('DiscordErrorResolver'))).inTransientScope()


    // Utils
    c.bind('CommandsFsUtils').toDynamicValue(() => new CommandsFsUtils(config)).inTransientScope()

    c.bind<IEmbedTemplatesBuilder>('EmbedTemplatesBuilder').toDynamicValue(() => new EmbedTemplatesBuilder(config)).inTransientScope()

    // services
    c.bind<IAccessResolver>('AccessResolver').toDynamicValue(() => new AccessResolver(config))

    // Errors
    c.bind('ErrorReplyer').toDynamicValue(() => new ErrorReplyer(c.get('EmbedTemplatesBuilder')))
    c.bind('ErrorManager').toDynamicValue(() => new ErrorManager(c.get('ErrorReplyer')))

    // Handlers
    c.bind<IAccessHandler>('AccessHandler').toDynamicValue(() => new AccessHandler(c.get('AccessResolver')))

    c.bind<ICommandHandler>('CommandHandler').toDynamicValue(() => new CommandHandler(c.get('CommandsFsUtils'), c.get<IAccessHandler>('AccessHandler'), c.get('ErrorManager'), container))

    c.bind<IInteractionHandler>('InteractionHandler').toDynamicValue(() => new InteractionHandler(c.get<ICommandHandler>('CommandHandler'), interactionCallbackRegistry))

    c.bind<IEventHandlers>('EventHandler').toDynamicValue(() => new EventHandler(config, client, container))

    // services
    c.bind<ICommandRegistar>('CommandRegistar').toDynamicValue(() => new CommandRegistar(c.get<IRestClient>('RestClient'), config.env)).inTransientScope()
    c.bind<ICommandDeclaration>('CommandDeclaration').toDynamicValue(() => new CommandDeclaration(c.get<ICommandRegistar>('CommandRegistar'), c.get<IAccessHandler>('AccessHandler'))).inTransientScope()
    c.bind<ICommandDeclarationInit>('CommandDeclarationInit').toDynamicValue(() => new CommandDeclarationInit(c.get('CommandsFsUtils'), c.get<ICommandDeclaration>('CommandDeclaration'))).inTransientScope()

    c.bind('DiscordInfos').toDynamicValue(() => new DiscordInfos(client))


    c.bind('CustomIdGenerator').toDynamicValue(() => new CustomIdGenerator(activeCustomIdRegistry)).inTransientScope()

    c.bind('PagedEmbedFactory').toDynamicValue(() => new PagedEmbedFactory(interactionCallbackRegistry, c.get('CustomIdGenerator')))


    // exe

    c.get<IEventHandlers>('EventHandler').handle()

    c.get<ICommandDeclarationInit>('CommandDeclarationInit').declare()




    //discord client init
    try {
        await client.login(config.env.AUTH)
    } catch {
        process.exit()
    }

}