import { Client } from 'discord.js'


import clientReady from '../events/clientReady.ts'
import messageCreate from '../events/messageCreate.ts'
import interactionHandler from './interactionHandler.ts'


export default async (client: Client) => {
    client.once('clientReady', () => clientReady(client))
    client.on('messageCreate', msg => messageCreate(msg))
    client.on('interactionCreate', interaction => interactionHandler(interaction))
}

