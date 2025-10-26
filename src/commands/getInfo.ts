import { ChatInputCommandInteraction, Embed, SlashCommandBuilder } from "discord.js"
import {getDiscordInfos} from '../services/discordInfos/discordInfos.ts'
import type { Command } from "../types/enums.types.ts";



const name = 'getinfo'
const description = 'Allow to get an info relative to discord api'



const cmdBuild = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)

            .addSubcommand(cmd => 
                cmd
                .setName('user')
                .setDescription('')
                .addStringOption(opt => 
                    opt
                    .setName('userid')
                    .setDescription('')
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('guild')
                .setDescription('')
                .addStringOption(opt => 
                    opt
                    .setName('guildid')
                    .setDescription('')
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('channel')
                .setDescription('')
                .addStringOption(opt => 
                    opt
                    .setName('channelid')
                    .setDescription('')
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('role')
                .setDescription('')
                .addStringOption(opt => 
                    opt
                    .setName('roleid')
                    .setDescription('')
                    .setRequired(true)
                )
            )

            .addSubcommand(cmd => 
                cmd
                .setName('emoji')
                .setDescription('')
                .addStringOption(opt => 
                    opt
                    .setName('emojiid')
                    .setDescription('')
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
    const sub = interaction.options.getSubcommand()
    const opt = interaction.options.getString(`${sub}id`)

    function reply(r: Embed) {
        interaction.reply({embeds: [r]})
    }


    switch(sub) {
        case 'user':

        
    }
}