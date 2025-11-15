export const botName = 'Utilsy'

export const mainColor = 'fca41c'

export const author = 'Deb84'


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