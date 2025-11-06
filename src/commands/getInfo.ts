/** import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import {getEmbedBuild} from '../utils/embedBuilder/embedBuilder.ts'
import {getSlashCmdAutoBuilder} from '../utils/slashCommandBuilder/slashCmdAutoBuilder.ts'
import type { BuildCommandData, Command } from "../types/enums.types.ts";



const name = 'getinfo'
const description = 'Allow to get an info relative to discord api'

const buildCommandData: BuildCommandData  = {
    name: 'getinfo',
    description: 'Return an embed of selected informations',
    sub: [
        {
            name: 'user',
            description: 'Return an embed of user informations',
            opts: [{
                type: 'string',
                name: 'id',
                description: 'user id (right click on a user with developper mode enabled)'
            }]
        },
        {
            name: 'guild',
            description: 'Return an embed of guild informations',
            opts: [{
                type: 'string',
                name: 'id',
                description: 'guild id (right click on a guild with developper mode enabled)'
            }]
        },
        {
            name: 'channel',
            description: 'Return an embed of channel informations',
            opts: [{
                type: 'string',
                name: 'id',
                description: 'channel id (right click on a channel with developper mode enabled)'
            }]
        },
        {
            name: 'role',
            description: 'Return an embed of role informations',
            opts: [{
                type: 'string',
                name: 'id',
                description: 'role id (right click on a role with developper mode enabled)'
            }]
        },
        {
            name: 'emoji',
            description: 'Return an embed of emoji informations',
            opts: [{
                type: 'string',
                name: 'id',
                description: 'emoji id'
            }]
        },
        {
            name: 'message',
            description: 'Return an embed of message informations',
            opts: [{
                type: 'string',
                name: 'id',
                description: 'message id (right click on a message with developper mode enabled)'
            }]
        }
    ]
}

const sCD = buildCommandData

// TODO : create an slashCommand builder utils
/* const cmdBuild = new SlashCommandBuilder().setName(name).setDescription(description) */

            /* .addSubcommand(cmd => cmd.setName(sCD.user.name).setDescription(sCD.user.description).addStringOption(opt => opt.setName('userid').setDescription('a')))

            .addSubcommand(cmd => cmd.setName('guild').setDescription('b').addStringOption(opt => opt.setName('guildid').setDescription('b')))

            .addSubcommand(cmd => cmd.setName('channel').setDescription('c').addStringOption(opt => opt.setName('channelid').setDescription('c')))

            .addSubcommand(cmd => cmd.setName('role').setDescription('d').addStringOption(opt => opt.setName('roleid').setDescription('d').setRequired(true)))

            .addSubcommand(cmd => cmd.setName('emoji').setDescription('e').addStringOption(opt => opt.setName('emojiid').setDescription('e').setRequired(true))
            ) */


/* const build = getSlashCmdAutoBuilder().buildFromData(buildCommandData)

const command: Command = {
    data: {
        commandName: name,
        description: description,
        commandType: "guild",
        accessLevel: "test",
        slashCommandBuild: build
    },
    execute
}
export default command;


async function execute(interaction: ChatInputCommandInteraction) {
    const dcInfo = getDiscordInfos()
    const embedBuild = getEmbedBuild()

    const sub = interaction.options.getSubcommand()
    const opt = interaction.options.getString(`${sub}id`)

    function reply(r: EmbedBuilder) {
        interaction.reply({embeds: [r]})
    }


    switch(sub) {
        case 'user':
            
            /* reply(await embedBuild.buildFromTemplate('getInfoTemplate', 'user', await dcInfo.getUser(opt ?? interaction.user.id))) */

/*     }
} */