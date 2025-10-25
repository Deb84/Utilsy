

import { SlashCommandBuilder } from 'discord.js'
import { add, get, remove, exists} from '../../src/services/slashCmdDeclaration/index.ts'
import { isArray } from '../../src/utils/checkObjectType.ts'
import type { CommandData } from '../../src/types/enums.types.ts'

const commandData: CommandData = {
    commandName: 'test',
    description: 'Just a test command',
    commandType: "guild",
    accessLevel: "test",
    slashCommandBuild: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Just a test command')
};


async function testget() {
    console.log('a')
    try {
        console.log('b')
        const a = await get(commandData);
        console.log(a);
    } catch (err) {
        console.error(err);
    }
}

async function testadd() {
    add(commandData)
}

async function testremove() {
    remove(commandData)
}


testadd()
testget()
testremove()
