import { Client } from "discord.js"

export const deps = ['Client']

export default class ClientReady {

    constructor(
        private client: Client
    ) {}

    event() {
        console.log(`Connected as ${this.client.user?.displayName}`)
        this.client.user?.setPresence({status: 'dnd'})
    }
}


