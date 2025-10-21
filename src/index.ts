import { Client, Events } from 'discord.js';
import dotenv from 'dotenv';
import intents from './config/intents.ts';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import eventHandler from './handlers/eventHandler.ts'

dotenv.config();

const client = new Client({ intents });

eventHandler(client)


client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'hi') {
    await interaction.reply('hi!');
  }
})



client.login(process.env.AUTH);
