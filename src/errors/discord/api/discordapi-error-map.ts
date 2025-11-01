import { DiscordAPIError } from "discord.js";
import * as ECC from './discordapi-errors.ts'
import { err } from "@/utils/result/index.ts";


const errorMap: Record<number, new (err: DiscordAPIError, message: string) => DiscordAPIError> = {
    10063: ECC.UnknownApplicationCommand
}

export {errorMap}