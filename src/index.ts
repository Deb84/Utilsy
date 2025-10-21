import { Client, Events } from 'discord.js';
import dotenv from 'dotenv';
import intents from './config/intents.ts';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import eventHandler from './handlers/eventHandler.ts'

dotenv.config();

const client = new Client({ intents });

eventHandler(client)


client.login(process.env.AUTH);
