import type { ICustomIdGenerator } from "./types/ICustomIdGenerator.ts";
import type { ActiveCustomIdRegistry } from "@/bootstrap/types/RegistryTypes.ts";
export type {ICustomIdGenerator}

export class CustomIdGenerator implements ICustomIdGenerator {
    constructor(
        private customIdRegistry: ActiveCustomIdRegistry
    ) {}

    generate() {
        const generateCustomId = () => String(Math.floor(Math.random()*1000000))
        let customId = generateCustomId()

        let result = this.customIdRegistry.has(customId)
        
        while(result.type === 'ok' && result.value) {
            customId = generateCustomId()
            result = this.customIdRegistry.has(customId)
        }

        this.customIdRegistry.register(customId)
        
        return customId
    }
}