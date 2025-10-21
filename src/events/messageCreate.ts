import { Message } from 'discord.js'
import messageHandlers from '../handlers/messageHandler.ts'


export default async (msg: Message) => {
    messageHandlers(msg)
}