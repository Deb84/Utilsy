
export class UnknownChannel extends Error {
    result?: Result
    channelId?: string

    constructor(msg?: string, options?: { 
        result?: Result,
        channelId?: string,
        errorOptions?: {cause?: Error},
        }) {

        super(msg || 'UnknownChannel', options?.errorOptions)
        this.name = 'UnknownChannel'

        this.result = options?.result
        this.channelId = options?.channelId

        Object.setPrototypeOf(this, UnknownChannel.prototype)
    }
}

export class UnknownUser extends Error {
    result?: Result
    userId?: string

    constructor(msg?: string, options?: { 
        result?: Result,
        userId?: string,
        errorOptions?: {cause?: Error},
        }) {

        super(msg || 'Unknown User', options?.errorOptions)
        this.name = 'UnknownUser'

        this.result = options?.result
        this.userId = options?.userId

        Object.setPrototypeOf(this, UnknownUser.prototype)
    }
}

export class UnknownGuild extends Error {
    result?: Result
    guildId?: string

    constructor(msg?: string, options?: {
        result?: Result,
        guildId?: string,
        errorOptions?: { cause?: Error },
    }) {
        super(msg || 'Unknown Guild', options?.errorOptions)
        this.name = 'UnknownGuild'

        this.result = options?.result
        this.guildId = options?.guildId

        Object.setPrototypeOf(this, UnknownGuild.prototype)
    }
}


export class UnknownEmoji extends Error {
    result?: Result
    emojiId?: string

    constructor(msg?: string, options?: {
        result?: Result,
        emojiId?: string,
        errorOptions?: { cause?: Error },
    }) {
        super(msg || 'Unknown Emoji', options?.errorOptions)
        this.name = 'UnknownEmoji'

        this.result = options?.result
        this.emojiId = options?.emojiId

        Object.setPrototypeOf(this, UnknownEmoji.prototype)
    }
}


export class UnknownRole extends Error {
    result?: Result
    roleId?: string

    constructor(msg?: string, options?: {
        result?: Result,
        roleId?: string,
        errorOptions?: { cause?: Error },
    }) {
        super(msg || 'Unknown Role', options?.errorOptions)
        this.name = 'UnknownRole'

        this.result = options?.result
        this.roleId = options?.roleId

        Object.setPrototypeOf(this, UnknownRole.prototype)
    }
}
