import { Client } from "discord.js"
import slashCmdInit from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { slashCmdAutoBuilderInit } from "../utils/slashCommandBuilder/slashCmdAutoBuilder.ts"
import {cmdFsUtilsInit} from '../utils/fsUtils/CommandsFsUtils.ts'
import { config } from "../config/index.ts"


export default (client: Client) => {
    cmdFsUtilsInit(config)

    slashCmdInit()
    initDiscordInfos(client)
    embedBuildInit(config)
    slashCmdAutoBuilderInit()
}