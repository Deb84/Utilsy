

import { SlashCommandBuilder } from 'discord.js'
import { add, get, remove, exists} from '../../src/services/slashCmdDeclaration/index.ts'
import { isArray } from '../../src/utils/checkObjectType.ts'
import type { CommandData } from '../../src/types/enums.types.ts'

const cmdBuild = new SlashCommandBuilder()
        .setName('test')
        .setDescription('Just a test command')
        .addSubcommand((cmd) => 
            cmd
                .setName('test2')
                .setDescription('aa'))
        .addSubcommand((cmd) => 
            cmd
                .setName('test3')
                .setDescription('bb'))

const commandData: CommandData = {
    commandName: 'getinfo',
    description: 'Just a test command',
    commandType: "guild",
    accessLevel: "test",
    slashCommandBuild: cmdBuild
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


testremove()
