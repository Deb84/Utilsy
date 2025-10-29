import { Client } from "discord.js"
import {SlashCommandInit} from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { slashCmdAutoBuilderInit } from "../utils/slashCommandBuilder/slashCmdAutoBuilder.ts"
import {CommandsFsUtils} from '../utils/fsUtils/CommandsFsUtils.ts'
import { AccessHandler } from "../handlers/accessHandler.ts"
import { CommandHandler } from "../handlers/commandHandler.ts"
import InteractionHandler from "../handlers/interactionHandler.ts"
import { config } from "../config/index.ts"


export default (client: Client) => {
    const commandsFsUtils = new CommandsFsUtils(config)
    const slashCommandInit = new SlashCommandInit(commandsFsUtils)
    const accessHandler = new AccessHandler(config)
    const commandHandler = new CommandHandler(commandsFsUtils, accessHandler, client)
    const interactionHandler = new InteractionHandler(commandHandler)
    initDiscordInfos(client)
    embedBuildInit(config)
    slashCmdAutoBuilderInit()
}