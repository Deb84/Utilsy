export interface IMapRegistry<K, V> {
    register(k:K, v:V): Result<void>
    unregister(k:K): Result<void>
    get(k:K): Result<V>
    has(k:K): Result<boolean>
}

export interface ISetRegistry<V> {
    register(v:V): Result<void>
    unregister(v:V): Result<void>
    has(v:V): Result<boolean>
}