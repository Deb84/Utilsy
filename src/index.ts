import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
import bootstrap from './bootstrap/index.ts'
import { config } from './config/index.ts'

const client = new Client({ intents: config.intents });
client.login(process.env.AUTH);

bootstrap()

