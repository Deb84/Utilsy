import { ShowableError } from '@/errors/showable/base/ShowableError.ts'
import {IEmbedTemplatesBuilder} from '@/utils/discord/embedBuilder/types/IEmbedTemplatesBuilder.ts'
export {IEmbedTemplatesBuilder}

export interface IErrorReplyer {
    reply: (err: ShowableError) => Promise<Result>
}