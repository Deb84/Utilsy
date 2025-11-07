import {readdirSync} from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

// to refactor

export default async (fileName: string, templatePath: string) => {
    fileName = fileName.toLowerCase()

    if (fileName === 'index') throw new Error(`The embed template can't be named "index"`)
    async function read(p: string) {
        const entries = readdirSync(p, {withFileTypes: true})
        console.log(entries)
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const r: any = await read(path.join(entry.parentPath, entry.name))
                if (!r) continue
                return r
            }
            if (entry.name.replace('.ts', '') === fileName) {
                return await import(pathToFileURL(path.join(entry.parentPath, entry.name)).href)
            }
        }
    }
    const result = await read(templatePath)
    if (result) return result
}