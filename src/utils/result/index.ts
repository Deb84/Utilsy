export type Result<T = unknown, C = unknown, E = Error> =
  | { type: 'ok'; value: T; context?: C}
  | { type: 'err'; error: E; context?: C }

export const ok = <T, C = unknown>(value?: T, context?: C): Result<T, C, never> => ({
  type: 'ok',
  value: value as T,
  context,
})

export const err = <E, C = unknown>(error: E, context?: C): Result<never, C, E> => ({
  type: 'err',
  error,
  context,
})