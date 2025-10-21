import { Message } from "discord.js"
import { stat, mkdir, writeFile, readFile } from "fs/promises"
import type { configType } from "./types"
import rawConfig from "./config.local.json" with { type: "json"}
import path from "path"

const config = rawConfig as configType

const outputPath = path.resolve(config.outputPath)
console.log(outputPath)
const guildDir = 'guilds'
const channelDir = 'channels'



export default async (msg: Message) => {
    console.log('a')
    if (!msg) return
    if (!msg.channelId) return
    if (msg.guildId && !config.guildIDs.includes(msg.guildId)) return;
    if (msg.channelId && !msg.guildId && !config.channelIDs.includes(msg.channelId)) return;
    const guild = Boolean(msg.guild)
    const guildId = guild ? msg.guildId : null
    const channelId = msg.channelId
    console.log('b')

    const parentPath = path.join(outputPath, ...(guildId ? [guildDir, guildId] : []), channelDir)
    const filePath = path.join(outputPath, ...(guildId ? [guildDir, guildId] : []), channelDir, `${channelId}.json`)

    try {
        await mkdir(outputPath, { recursive: true });
        await mkdir(parentPath, { recursive: true });
    } catch (err) {
        console.error('mkdir failed:', err);
    }

    let data = []
    try {
        const content = await readFile(filePath, {encoding: 'utf-8'})
        data = JSON.parse(content)
    } catch {}

    data.push(msg)

    try {
        await writeFile(filePath, JSON.stringify(data, null, 2))
    } catch {
        console.error(`failed to create the file ${channelId}.json`)
    }





}