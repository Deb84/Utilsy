import { Client } from "discord.js"
import slashCmdInit from "./slashCmdInit.ts"
import { initDiscordInfos } from "../services/discordInfos/discordInfos.ts"


export default (client: Client) => {
    slashCmdInit()
    initDiscordInfos(client)
}