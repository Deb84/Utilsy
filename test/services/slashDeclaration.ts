

import { SlashCommandBuilder } from 'discord.js'
import { add, get, remove, exists} from '../../src/services/slashDeclarationApi/index.ts'
import type { CommandData } from '../../src/types/enums.types.ts'

const commandData: CommandData = {
    commandName: 'hi',
    description: 'Just a test command',
    commandType: "guild",
    accessLevel: "public",
    slashCommandBuild: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Just a test command')
};


async function test() {
    console.log('a')
    try {
        console.log('b')
        const a = await get(commandData);
        console.log(a);
    } catch (err) {
        console.error(err);
    }
}

console.log(await exists(commandData))

test()