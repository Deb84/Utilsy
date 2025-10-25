import normalizePath from '../utils/normalizePath.ts'
import intents from './intents.ts'
import paths from './paths.json' with {type: 'json'}
import type { Paths } from '../types/enums.types.ts' 


async function reloadConfig() {
   return await import("../config/config.config.local.ts" + '?update=' + Date.now())
}


// TODO : config interface
export const config = {
    intents: intents,
    paths: (() => { // normalize the paths
        let newPaths: Record<string, string> = {}
        for (const [k, v] of Object.entries(paths)) {
            newPaths[k] = normalizePath(v)
        }
        return newPaths as unknown as Paths
    })(),
    globalConfig: reloadConfig
}