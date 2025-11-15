import { CommandInteraction } from "discord.js"
export {CommandInteraction}

export type AccessScope = 'test' | 'private'
export type AccessModelScope = AccessScope | Boolean

export interface AccessModel {
    public: {
        public: AccessModelScope
        test: AccessModelScope
        private: AccessModelScope
    },
    test: {
        public: AccessModelScope
        test: AccessModelScope
        private: AccessModelScope
    },
    private: {
        public: AccessModelScope
        test: AccessModelScope
        private: AccessModelScope
    }
}

type resolveCommandAccess = (command: ICommandClass) => Promise<Result<Access | 'public'>>
type hasCommandAccess = (interaction: CommandInteraction, command: ICommandClass) => Promise<Result<boolean>>

export interface IAccessResolver {
    resolveCommandAccess: resolveCommandAccess
    hasCommandAccess: hasCommandAccess
}