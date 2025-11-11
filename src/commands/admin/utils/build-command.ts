import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export default (build: SlashCommandBuilder): SlashCommandSubcommandsOnlyBuilder => {
    return build
        .addSubcommand(cmd => 
            cmd
            .setName('rmvcommand')
            .setDescription('Remove commands declaration')
            .addBooleanOption(opt => 
                opt
                .setName('all')
                .setDescription('remove every commands')
            )
            .addBooleanOption(opt => 
                opt
                .setName('rmvadmincmd')
                .setDescription('remove the admin command too')
            )
        )
        .addSubcommand(cmd => 
            cmd
            .setName('addcommand')
            .setDescription('Add commands declaration')
            .addBooleanOption(opt => 
                opt
                .setName('all')
                .setDescription('add every commands')
            )
        )
}