import { DiscordAPIError } from "discord.js";

export class UnknownAccount extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownApplication extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownChannel extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownIntegration extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownInvite extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownMember extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownMessage extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownPermissionOverwrite extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownProvider extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownRole extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownToken extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownUser extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownEmoji extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownWebhook extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownWebhookService extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownSession extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownAsset extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownBan extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownSKU extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownStoreListing extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownEntitlement extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownBuild extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownLobby extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownBranch extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownStoreDirectoryLayout extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownRedistributable extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownGiftCode extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownStream extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownPremiumServerSubscribeCooldown extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownGuildTemplate extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownDiscoverableServerCategory extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownSticker extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownStickerPack extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownInteraction extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
// 10063
export class UnknownApplicationCommand extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string = 'Unknown Application Command') {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownVoiceState extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownApplicationCommandPermissions extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownStageInstance extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownGuildMemberVerificationForm extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownGuildWelcomeScreen extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownGuildScheduledEvent extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownGuildScheduledEventUser extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownTag extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class UnknownSound extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

export class BotsCantUseThisEndpoint extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
//20009
export class ExplicitContentBlocked extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
//20012
export class UnauthorizedApplicationAction extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
// 20016
export class ActionBlockedBySlowmode extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
//20018
export class OwnerRequired extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

//20022
export class MessageEditBlockedByRateLimit extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
/** 20024: Under Minimum Age */
export class UnderMinimumAge extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}

/** 20028: The channel you are writing has hit the write rate limit */
export class ChannelWriteRateLimitReached extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
/** 20029: The write action you are performing on the server has hit the write rate limit */
export class WriteRateLimitReached extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
/** 20031: Your Stage topic, server name, server description, or channel names contain words that are not allowed */
export class ServerForbiddenWords extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
/** 20035: Guild premium subscription level too low */
export class GuildBoostTooLow extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
/** 30001: Maximum number of guilds reached (100) */
export class MaxGuildsReached extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}
/** 30002: Maximum number of friends reached (1000) */
export class MaxFriendsReached extends DiscordAPIError {
    constructor(err: DiscordAPIError, public message: string) {
        super(err.rawError, err.code, err.status, err.method, err.url, err.requestBody)
    }
}