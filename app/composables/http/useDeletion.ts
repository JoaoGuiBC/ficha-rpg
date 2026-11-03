import type { Result } from '~~/shared/types/result'
import type { Deletion } from '~~/shared/types/deletion'

export function useDeletion() {
    const remove = async (url: string): Promise<Result<Deletion>> => {
        const result: Result<Deletion> = await $fetch(url, { method: 'DELETE' })

        return result
    }

    return { remove }
}
