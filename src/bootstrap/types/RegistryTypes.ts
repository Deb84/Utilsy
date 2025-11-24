import type { IMapRegistry, ISetRegistry } from "@/utils/registry/registry.ts"
export type ActiveCustomIdRegistry = ISetRegistry<string>
export type InteractionCallbackRegistry = IMapRegistry<string, Callback<unknown>>