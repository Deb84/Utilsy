import {readdirSync} from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import type { BotConfig, EmbedTemplate } from '../../../types/enums.types.ts'


export default async (fileName: string, templatePath: string) => {

    if (fileName === 'index') throw new Error(`The embed template can't be named "index"`)
    async function read(p: string) {
        console.log(p)
        const entries = readdirSync(p, {withFileTypes: true})
        for (const entry of entries) {
            if (entry.isDirectory()) return await read(path.join(entry.parentPath, entry.name))
            if (entry.name.replace('.ts', '') === fileName) {
                return await import(pathToFileURL(path.join(entry.parentPath, entry.name)).href)
            }
        }
    }
    const result = await read(templatePath)
    if (result) return result as EmbedTemplate
}