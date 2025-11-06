export interface ICommand {
    deps: string[]
    default: ICommandClass
}