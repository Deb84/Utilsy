import { Client } from 'discord.js'


import clientReady from '../events/clientReady.ts'
import messageCreate from '../events/messageCreate.ts'
import interactionCreate from '../events/interactionCreate.ts'


export default async (client: Client) => {
    client.once('clientReady', () => clientReady(client)) // clientReady used to be ready for the new api 
    client.on('messageCreate', msg => messageCreate(msg))
    client.on('interactionCreate', interaction => interactionCreate(interaction))
}

