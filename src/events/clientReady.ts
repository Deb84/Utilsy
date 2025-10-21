import { Client } from "discord.js"

export default (client: Client) => {
    console.log(`Connected as ${client.user?.displayName}`)
}