import {readdirSync} from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const templatePath = './'

export default async (fileName: string) => {
    if (fileName === 'index') throw new Error(`The embed template can't be named "index"`)
    async function read(p: string) {
        const entries = readdirSync(p, {withFileTypes: true})
        for (const entry of entries) {
            if (entry.isDirectory()) await read(path.join(entry.parentPath, entry.name))
            if (entry.name.replace('.ts', '') === fileName) return import(pathToFileURL(path.join(entry.parentPath, entry.name)).href)
        }
    }
    return read(templatePath)
}