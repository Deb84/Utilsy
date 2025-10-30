export interface IEventClass<TArgs extends any[] = unknown[]> {
    event: (...args: TArgs) => void
}

export interface IEvent {
    deps: string[]
    default: new (...args: any[]) => IEventClass
}