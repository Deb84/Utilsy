import { Client } from "discord.js"

export const deps = ['Client']

export default class ClientReady {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    event() {
        console.log(`Connected as ${this.client.user?.displayName}`)
    }
}