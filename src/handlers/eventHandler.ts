import { Client } from 'discord.js'
import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import {config} from '../config/index.ts'


const eventsPath = config.paths.events
const eventFiles = readdirSync(eventsPath, { withFileTypes: true})

const onceEvents = ['clientReady']


export default async (client: Client) => {
        for (const file of eventFiles) {
        const fileName = file.name.replace('.ts', '');
        const filePath = path.join(file.parentPath, file.name);
        const eventMod = await import(pathToFileURL(filePath).href);
        const event = eventMod.default

        if (onceEvents.includes(fileName)) {
            client.once(fileName, (...args) => event(...args));
            continue;
        }

        client.on(fileName, (...args) => event(...args))
        console.log(`Event "${file.name}" loaded`)
    }
}

