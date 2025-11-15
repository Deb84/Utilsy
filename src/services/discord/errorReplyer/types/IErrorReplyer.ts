import { ShowableError } from '@/errors/showable/base/ShowableError.ts'
import {IEmbedTemplatesBuilder} from '@/utils/discord/embedBuilder/types/IEmbedTemplatesBuilder.ts'
export {IEmbedTemplatesBuilder}

export type options = {defered?: boolean}

export interface IErrorReplyer {
    embedReply: (err: ShowableError, options: options) => Promise<Result>
    reply: (err: ShowableError, options: options) => Promise<Result>
}