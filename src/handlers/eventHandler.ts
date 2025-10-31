import { readdirSync } from "fs";
import { pathToFileURL } from "url";
import path from 'path'
import type { 
    IEventHandlers, 
    Container, 
    Client,
    IEvent,
    IEventClass,
} from "./types/IEventHandlers.ts";
export type {IEventHandlers}


const onceEvents = ['clientReady']
const exclude = ['messageCreate']

export class EventHandler implements IEventHandlers {
    private config: BotConfig
    private client: Client
    private container: Container
    private events: IEventClass[]

    constructor(config: BotConfig, client: Client, container: Container) {
        this.config = config
        this.client = client
        this.container = container
        this.events = []
    }


    async handle() {
        if (this.events.length === 0) {
            const eventFiles = readdirSync(this.config.paths.events, { withFileTypes: true})

            for (const file of eventFiles) {
                const fileName = file.name.replace('.ts', '');
                if (exclude.includes(fileName) || file.isDirectory()) continue
                const filePath = path.join(file.parentPath, file.name);
                const eventMod = await import(pathToFileURL(filePath).href) as IEvent
                // initialiser les class d'event à la place


                const deps = []
                if (eventMod.deps) {
                    for (const dep of eventMod.deps) {
                        deps.push(this.container.get(dep))
                    }
                }

                const cls = new eventMod.default(...deps)
                this.events.push(cls)


                if (onceEvents.includes(fileName)) {
                    this.client.once(fileName, (...args) => cls.event(...args));
                    continue;
                }

                this.client.on(fileName, (...args) => cls.event(...args))
                console.log(`Event "${file.name}" loaded`)
            }
        }
    }
}
