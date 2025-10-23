import intents from './intents.ts'
import paths from './paths.json' with {type: 'json'}


async function reloadConfig() {
   return await import("../config/config.config.local.ts" + '?update=' + Date.now())
}


// TODO : config interface
export const config = {
    intents: intents,
    paths: paths,
    globalConfig: reloadConfig
}