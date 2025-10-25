import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { config } from './config/index.ts'
import bootstrap from './bootstrap/index.ts'
import eventHandler from './handlers/eventHandler.ts'

dotenv.config();

const client = new Client({ intents: config.intents });
client.login(process.env.AUTH);

bootstrap()

eventHandler(client)

