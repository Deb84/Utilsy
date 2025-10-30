import { Container  } from "inversify"
import { Client, REST } from "discord.js"
import {SlashCommandInit} from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { slashCmdAutoBuilderInit } from "../utils/slashCommandBuilder/slashCmdAutoBuilder.ts"
import {CommandsFsUtils} from '../utils/fsUtils/CommandsFsUtils.ts'
import { AccessHandler } from "../handlers/accessHandler.ts"
import { CommandHandler } from "../handlers/commandHandler.ts"
import InteractionHandler from "../handlers/interactionHandler.ts"
import EventHandler from "../handlers/eventHandler.ts"
import SlashCmdDeclaration from "../services/slashCmdDeclaration/index.ts"
import { config } from "../config/index.ts"
import type { IEventHandlers } from "../handlers/types/IEventHandlers.ts"


export default (client: Client) => {
    const container = new Container({defaultScope: "Singleton"})
    const c = container // be explicit first, minimise after

    const rest = new REST({ version: '10'}).setToken(process.env.AUTH!)

    c.bind('onfig').toConstantValue(config)
    c.bind('Client').toConstantValue(client)

    c.bind('CommandsFsUtils').toDynamicValue(() => new CommandsFsUtils(config))

    c.bind('AccessHandler').toDynamicValue(() => new AccessHandler(config))

    c.bind('SlashCmdDeclaration').toDynamicValue(() => new SlashCmdDeclaration(rest, c.get('AccessHandler')))

    c.bind('SlashCommandInit').toDynamicValue(() => new SlashCommandInit(c.get('CommandsFsUtils'), c.get('SlashCmdDeclaration')))

    c.bind('CommandHandler').toDynamicValue(() => new CommandHandler(c.get('CommandsFsUtils'), c.get('AccessHandler'), client))

    c.bind('InteractionHandler').toDynamicValue(() => new InteractionHandler(c.get('CommandHandler')))

    c.bind('EventHandler').toDynamicValue(() => new EventHandler(config, client, container))

    c.get<IEventHandlers>('EventHandler').handle()
    initDiscordInfos(client)
    embedBuildInit(config)
    slashCmdAutoBuilderInit()
}