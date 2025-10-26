import { Client } from "discord.js"
import slashCmdInit from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"
import { embedBuildInit } from "../utils/embedBuilder/embedBuilder.ts"
import { config } from "../config/index.ts"


export default (client: Client) => {
    slashCmdInit()
    initDiscordInfos(client)
    embedBuildInit(config)
}