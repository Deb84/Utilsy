import { Container  } from "inversify"
import { Client, REST } from "discord.js"

import { DiscordApiCodeErrResolver } from "../errors/discord/api/discordapi-err-code-resolver.ts"

import {SlashCommandInit, type ISlashCmdInit} from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { slashCmdAutoBuilderInit } from "../utils/slashCommandBuilder/slashCmdAutoBuilder.ts"
import {CommandsFsUtils} from '../utils/fsUtils/CommandsFsUtils.ts'
import { AccessHandler, type IAccessHandler } from "../handlers/accessHandler.ts"
import { CommandHandler, type ICommandHandler } from "../handlers/commandHandler.ts"
import {InteractionHandler, type IInteractionHandler} from "../handlers/interactionHandler.ts"
import {EventHandler, type IEventHandlers} from "../handlers/eventHandler.ts"

import { RestClient, type IRestClient } from "../services/discord/api/restClient/rest-client.ts"
import { CommandRegistar, type ICommandRegistar } from "../services/discord/index.ts"
import { CommandDeclaration } from "../services/discord/commandDeclaration/command-declaration.ts"


import { config } from "../config/index.ts"


export default (client: Client) => {
    const container = new Container({defaultScope: "Singleton"})
    const c = container // be explicit first, minimise after

    const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

    c.bind('Config').toConstantValue(config)
    c.bind('Client').toConstantValue(client)

    c.bind('DiscordErrorResolver').toDynamicValue(() => new DiscordApiCodeErrResolver())


    c.bind('CommandsFsUtils').toDynamicValue(() => new CommandsFsUtils(config))

    c.bind<IAccessHandler>('AccessHandler').toDynamicValue(() => new AccessHandler(config))

    c.bind<ICommandHandler>('CommandHandler').toDynamicValue(() => new CommandHandler(c.get('CommandsFsUtils'), c.get('AccessHandler'), client))

    c.bind<IInteractionHandler>('InteractionHandler').toDynamicValue(() => new InteractionHandler(c.get('CommandHandler')))

    c.bind('RestClient').toDynamicValue(() => new RestClient(rest, c.get('DiscordErrorResolver')))
    c.bind('CommandRegistar').toDynamicValue(() => new CommandRegistar(c.get('RestClient'), config.env))

    c.bind('CommandDeclaration').toDynamicValue(() => new CommandDeclaration(c.get('CommandRegistar'), c.get('AccessHandler')))


    c.bind<ISlashCmdInit>('SlashCommandInit').toDynamicValue(() => new SlashCommandInit(c.get('CommandsFsUtils'), c.get('CommandDeclaration')))

    c.bind<IEventHandlers>('EventHandler').toDynamicValue(() => new EventHandler(config, client, container))

    c.get<IEventHandlers>('EventHandler').handle()

    c.get<ISlashCmdInit>('SlashCommandInit').declare()
    initDiscordInfos(client)
    embedBuildInit(config)
    slashCmdAutoBuilderInit()
}