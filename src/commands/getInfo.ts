import { ChatInputCommandInteraction, Embed, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import {getDiscordInfos} from '../services/discordInfos/discordInfos.ts'
import {getEmbedBuild} from '../utils/embedBuilder/embedBuilder.ts'
import type { Command } from "../types/enums.types.ts";



const name = 'getinfo'
const description = 'Allow to get an info relative to discord api'


// TODO : create an slashCommand builder utils
const cmdBuild = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)

            .addSubcommand(cmd => 
                cmd
                .setName('user')
                .setDescription('a')
                .addStringOption(opt => 
                    opt
                    .setName('userid')
                    .setDescription('a')
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('guild')
                .setDescription('b')
                .addStringOption(opt => 
                    opt
                    .setName('guildid')
                    .setDescription('b')
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('channel')
                .setDescription('c')
                .addStringOption(opt => 
                    opt
                    .setName('channelid')
                    .setDescription('c')
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('role')
                .setDescription('d')
                .addStringOption(opt => 
                    opt
                    .setName('roleid')
                    .setDescription('d')
                    .setRequired(true)
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('emoji')
                .setDescription('e')
                .addStringOption(opt => 
                    opt
                    .setName('emojiid')
                    .setDescription('e')
                    .setRequired(true)
                )
            )


const command: Command = {
    data: {
        commandName: name,
        description: description,
        commandType: "guild",
        accessLevel: "test",
        slashCommandBuild: cmdBuild
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
            
            reply(await embedBuild.buildFromTemplate('getInfoTemplate', 'get user', await dcInfo.getUser(opt ?? interaction.user.id)))

    }
}