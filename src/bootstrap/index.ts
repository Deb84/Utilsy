import { Container  } from "inversify"
import { Client, REST } from "discord.js"

import {SlashCommandInit, type ISlashCmdInit} from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { slashCmdAutoBuilderInit } from "../utils/slashCommandBuilder/slashCmdAutoBuilder.ts"
import {CommandsFsUtils} from '../utils/fsUtils/CommandsFsUtils.ts'
import { AccessHandler, type IAccessHandler } from "../handlers/accessHandler.ts"
import { CommandHandler, type ICommandHandler } from "../handlers/commandHandler.ts"
import {InteractionHandler, type IInteractionHandler} from "../handlers/interactionHandler.ts"
import {EventHandler, type IEventHandlers} from "../handlers/eventHandler.ts"
import SlashCmdDeclaration from "../services/slashCmdDeclaration/index.ts"
import { config } from "../config/index.ts"


export default (client: Client) => {
    const container = new Container({defaultScope: "Singleton"})
    const c = container // be explicit first, minimise after

    const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

    c.bind('Config').toConstantValue(config)
    c.bind('Client').toConstantValue(client)

    c.bind('CommandsFsUtils').toDynamicValue(() => new CommandsFsUtils(config))

    c.bind<IAccessHandler>('AccessHandler').toDynamicValue(() => new AccessHandler(config))

    c.bind<ICommandHandler>('CommandHandler').toDynamicValue(() => new CommandHandler(c.get('CommandsFsUtils'), c.get('AccessHandler'), client))

    c.bind<IInteractionHandler>('InteractionHandler').toDynamicValue(() => new InteractionHandler(c.get('CommandHandler')))


    c.bind('SlashCmdDeclaration').toDynamicValue(() => new SlashCmdDeclaration(rest, c.get('AccessHandler')))

    c.bind<ISlashCmdInit>('SlashCommandInit').toDynamicValue(() => new SlashCommandInit(c.get('CommandsFsUtils'), c.get('SlashCmdDeclaration')))



    c.bind<IEventHandlers>('EventHandler').toDynamicValue(() => new EventHandler(config, client, container))

    c.get<IEventHandlers>('EventHandler').handle()
    initDiscordInfos(client)
    embedBuildInit(config)
    slashCmdAutoBuilderInit()
}