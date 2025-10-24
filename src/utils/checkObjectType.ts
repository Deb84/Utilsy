
export function isObject(obj: any) {
    if (obj != null && typeof obj == 'object' && Object.getPrototypeOf(obj) === Object.prototype) return true
    return false
}

export function isArray<T>(arr: any): arr is T[] {
    if (typeof arr == 'object' && Array.isArray(arr)) return true
    return false
}