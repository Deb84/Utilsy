import { AccessConfig, AccessState } from "../types/enums.types"

export const accessState: AccessState = 'test' as const // possible values are test, public, private

export const accessConfig: AccessConfig = {
    private: {
        userIDs: [],
        guildIDs: []
    },
    test: {
        userIDs: [],
        guildIDs: []
    }
} as const