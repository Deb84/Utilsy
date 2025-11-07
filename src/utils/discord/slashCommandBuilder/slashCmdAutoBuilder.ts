import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import type { BuildCommandData, BuildCommandOptData, BuildSubCommandData } from "../../types/enums.types.ts";


type CmdBuilder = SlashCommandBuilder | SlashCommandSubcommandBuilder


class slashCommandAutoBuilder {


    buildFromData(data: BuildCommandData) {

        function applyOpt(opt: BuildCommandOptData, cmd: CmdBuilder) {

            // HATE to do this like that btw, so many lines for NOTHING
            switch(opt.type) {
                case 'string':
                    cmd.addStringOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(!!opt.required))
                    break
                case 'int':
                    cmd.addIntegerOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(!!opt.required))
                    break
                case 'bool': 
                    cmd.addBooleanOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(!!opt.required))
                    break
                case 'user':
                    cmd.addUserOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(!!opt.required))
                    break
                case 'role':
                    cmd.addRoleOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(!!opt.required))
                    break
                case 'channel':
                    cmd.addChannelOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(!!opt.required))
                    break
            }
        }

        function addSubCmd(subs: BuildSubCommandData[] ,mainCmd?: CmdBuilder) {
            subs?.forEach(sub => {
                let subCmd = new SlashCommandSubcommandBuilder().setName(sub.name).setDescription(sub.description)
                
                if (sub.opts) addOpt(sub.opts, subCmd)

                if (mainCmd instanceof SlashCommandBuilder) mainCmd.addSubcommand(subCmd)
            });
        }

        function addOpt(opts: BuildCommandOptData[], cmd: CmdBuilder) {
            opts.forEach(opt => {
                applyOpt(opt, cmd)
            })
        }


        // building
        const build = new SlashCommandBuilder()


        build
            .setName(data.name)
            .setDescription(data.description)

        if (data.sub) addSubCmd(data.sub, build)
        if (data.opts) addOpt(data.opts, build)

        return build
    }
}

let instance: slashCommandAutoBuilder | null = null

export function slashCmdAutoBuilderInit() {
    if (!instance) instance = new slashCommandAutoBuilder()
}

export function getSlashCmdAutoBuilder() {
    if (!instance) throw new Error('embedBuild not initialized')
    return instance
}