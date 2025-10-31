import { DiscordAPIError } from "discord.js";
import * as ECC from './discordapi-errors.ts'


const errorMap: Record<number, new (err: DiscordAPIError, message: string) => DiscordAPIError> = {
    10063: ECC.UnknownApplicationCommand
}