export default interface IEvent<TArgs extends any[] = unknown[]> {
    event: (...args: TArgs) => void
}