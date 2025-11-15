import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export default (build: SlashCommandBuilder): SlashCommandSubcommandsOnlyBuilder => {
    return build
        .addSubcommand(cmd => 
            cmd
            .setName('user')
            .setDescription('Return an embed of user informations')
            .addStringOption(opt => 
                opt
                .setName('id')
                .setDescription('user id (right click on a user with developper mode enabled)')
            )
            .addMentionableOption(opt => 
                opt
                .setName('mention')
                .setDescription('user mention')
            )
            .addBooleanOption(opt => 
                opt
                .setName('full')
                .setDescription('return the entire user object in an embed')
            )
            .addBooleanOption(opt => 
                opt
                .setName('ephemeral')
                .setDescription('Only you will be able to see the response')
            )
        )
        .addSubcommand(cmd => 
            cmd
            .setName('guild')
            .setDescription('Return an embed of guild informations')
            .addStringOption(opt => 
                opt
                .setName('id')
                .setDescription('guild id (right click on a guild with developper mode enabled)')
            )
            .addBooleanOption(opt => 
                opt
                .setName('full')
                .setDescription('return the entire guild object in an embed')
            )
            .addBooleanOption(opt => 
                opt
                .setName('ephemeral')
                .setDescription('Only you will be able to see the response')
            )
        )
        .addSubcommand(cmd => 
            cmd
            .setName('channel')
            .setDescription('Return an embed of channel informations')
            .addStringOption(opt => 
                opt
                .setName('id')
                .setDescription('channel id (right click on a channel with developper mode enabled)')
            )
            .addMentionableOption(opt => 
                opt
                .setName('mention')
                .setDescription('channel mention')
            )
            .addBooleanOption(opt => 
                opt
                .setName('ephemeral')
                .setDescription('Only you will be able to see the response')
            )
        )
        .addSubcommand(cmd => 
            cmd
            .setName('role')
            .setDescription('Return an embed of role informations')
            .addStringOption(opt => 
                opt
                .setName('id')
                .setDescription('role id (right click on a role with developper mode enabled)')
            )
            .addMentionableOption(opt => 
                opt
                .setName('mention')
                .setDescription('role mention')
            )
            .addBooleanOption(opt => 
                opt
                .setName('ephemeral')
                .setDescription('Only you will be able to see the response')
            )
        )
        .addSubcommand(cmd => 
            cmd
            .setName('emoji')
            .setDescription('Return an embed of emoji informations')
            .addStringOption(opt => 
                opt
                .setName('id')
                .setDescription('emoji id (right click on a role with developper mode enabled)')
                .setRequired(true)
            )
            .addBooleanOption(opt => 
                opt
                .setName('ephemeral')
                .setDescription('Only you will be able to see the response')
            )
        )
        .addSubcommand(cmd => 
            cmd
            .setName('message')
            .setDescription('Return an embed of message informations')
            .addStringOption(opt => 
                opt
                .setName('id')
                .setDescription('message id (right click on a role with developper mode enabled)')
                .setRequired(true)
            )
            .addBooleanOption(opt => 
                opt
                .setName('ephemeral')
                .setDescription('Only you will be able to see the response')
            )
        )
}