import { AccessConfig, AccessLevel } from "../types/enums.types.ts"

export const accessState: AccessLevel = 'test' as const // possible values are test, public, private

export const accessConfig: AccessConfig = {
    private: {
        userIDs: [],
        guildIDs: []
    },
    test: {
        userIDs: [],
        guildIDs: []
    },
    public: 'public'
} as const