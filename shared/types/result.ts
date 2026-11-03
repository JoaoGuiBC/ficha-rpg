export type Result<T> =
    | { type: 'success'; content: T; error: undefined }
    | { type: 'error'; content: undefined; error: string }

export const ok = <T>(content: T): Result<T> => ({
    type: 'success',
    content,
    error: undefined,
})

export const err = <T = never>(error: string): Result<T> => ({
    type: 'error',
    content: undefined,
    error,
})
