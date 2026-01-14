import type { IMapRegistry, ISetRegistry } from "./types/IRegistry.ts";
export type {IMapRegistry, ISetRegistry}
import * as R from 'result'

export class MapRegistry<K, V> implements IMapRegistry<K, V> {
    private store = new Map<K, V>()

    register(k: K, v: V): Result<void> {
        console.log(`${k} set to ${v}`)
        this.store.set(k, v)
        return R.ok()
    }

    unregister(k: K): Result<void> {
        this.store.delete(k)
        return R.ok()
    }
    has(k: K): Result<boolean> {
        return R.ok(this.store.has(k))
    }
    get(k: K): Result<V> {
        const v = this.store.get(k)
        if (v) return R.ok(v)
        return R.err(new Error(`Unable to get the value of "${String(k)}"`))
    }
}


export class SetRegistry<V> implements ISetRegistry<V> {
    private store = new Set<V>()

    register(v: V): Result<void> {
        this.store.add(v)
        return R.ok()
    }
    unregister(v:V): Result<void> {
        this.store.delete(v)
        return R.ok()
    }
    has(v:V): Result<boolean> {
        return R.ok(this.store.has(v))
    }
}