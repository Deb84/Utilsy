
type Callback = ()=>unknown
type value = Callback
type key = number

class InteractionCallBackRegistry {
    private map: Map<key, value>

    constructor() {
        this.map = new Map()
    }


    register(k: key, v:value) {
        return this.map.set(k, v)
    }

    unregister(k: key) {
        return this.map.delete(k)
    }

    get(k: key) {
        return this.map.get(k)
    }

    has(k: key) {
        return this.map.has(k)
    }
}