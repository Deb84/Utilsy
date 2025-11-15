

export class GenericAccessError extends Error {
    static defaultMessage = 'Access error thrown'

    constructor(
        message?: string,
        result?: Result
    ) {
        super(message || GenericAccessError.defaultMessage)
    }
}