import type { AccessModel } from "../types/IAccessResolver.ts";

/**
 * first bloc is the possible bot state scope
 * second bloc is the possible command accessLevel
 * e.g : the botState is test & the command access level is private :
 * 
 * get the private value from test bloc, only private guild & user will be authorized
 */


export const accessModel: AccessModel = {
    public: {
        public: true,
        test: 'test',
        private: 'private'
    },
    test: {
        public: 'test',
        test: 'test',
        private: 'private'
    },
    private: {
        public: false,
        test: false,
        private: 'private'
    }
} as const;