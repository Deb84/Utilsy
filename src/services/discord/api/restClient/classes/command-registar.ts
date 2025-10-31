import { ApplicationCommand, Routes } from "discord.js";
import type { ICommandRegistar, IRestClient } from "../types/ICommandRegistar.ts";


export class CommandRegistar implements ICommandRegistar {
    private restClient: IRestClient
    private env: Environment

    constructor(restClient: IRestClient, env: Environment) {
        this.restClient = restClient
        this.env = env
    }

    //  add
    async registerGlobal(commandJson: unknown) {
        return await this.restClient.post(Routes.applicationCommands(this.env.APPID), commandJson)
    }

    async registerGuild(commandJson: unknown, guildId: string) {
        return await this.restClient.post(Routes.applicationGuildCommands(this.env.APPID, guildId), commandJson)
    }

    //  remove
    async removeGlobal(commandId: string) {
        return await this.restClient.delete(Routes.applicationCommand(this.env.APPID, commandId))
    }

    async removeGuild(guildId: string, commandId: string) {
        return await this.restClient.delete(Routes.applicationGuildCommand(this.env.APPID, guildId, commandId))
    }

    // patch
    async updateGlobal(commandJson: unknown, commandId: string) {
        return await this.restClient.patch(Routes.applicationCommand(this.env.APPID, commandId), commandJson)
    }

    async updateGuild(commandJson: unknown, guildId: string, commandId: string) {
        return await this.restClient.patch(Routes.applicationGuildCommand(this.env.APPID, guildId, commandId), commandJson)
    }

    //get
    async getGlobal(commandId: string) {
        return await this.restClient.get<ApplicationCommand>(Routes.applicationCommand(this.env.APPID, commandId))
    }

    async getGuild(guildId: string, commandId: string) {
        return await this.restClient.get<ApplicationCommand>(Routes.applicationGuildCommand(this.env.APPID, guildId, commandId))
    }

    async getGlobalAll() {
        return await this.restClient.get<ApplicationCommand[]>(Routes.applicationCommands(this.env.APPID))
    }

    async getGuildAll(guildId: string) {
        return await this.restClient.get<ApplicationCommand[]>(Routes.applicationGuildCommands(this.env.APPID, guildId))
    }
    
}