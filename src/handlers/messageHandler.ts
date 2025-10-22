import { Message } from "discord.js"
import scrapper from "../services/msgScrappers/scrapper.ts"

export default (msg: Message) => {
    scrapper(msg)
}