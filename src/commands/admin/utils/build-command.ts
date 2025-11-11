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
        )
}