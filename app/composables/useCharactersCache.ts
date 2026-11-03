import type { CharacterList } from '~~/shared/types/character-list'
import type { Result } from '~~/shared/types/result'

const CACHE_KEY = 'characters:list'
const CACHE_TIMESTAMP_KEY = 'characters:list:timestamp'
const CACHE_TTL = 5 * 60 * 1000

export function useCharactersCache() {
    const characters = useState<CharacterList[]>('characters', () => [])

    const isCacheValid = () => {
        if (!import.meta.client) {
            return false
        }

        const timestamp = Number(localStorage.getItem(CACHE_TIMESTAMP_KEY) ?? 0)

        return Date.now() - timestamp < CACHE_TTL
    }

    const getCachedCharacters = (): CharacterList[] | null => {
        if (!isCacheValid()) {
            return null
        }

        const cached = localStorage.getItem(CACHE_KEY)

        if (!cached) {
            return null
        }

        try {
            return JSON.parse(cached) as CharacterList[]
        } catch {
            invalidateCharacters()
            return null
        }
    }

    const saveCharacters = (characters: CharacterList[]) => {
        if (!import.meta.client) {
            return
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(characters))
        localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()))
    }

    const fetchCharacters = async () => {
        const cachedCharacters = getCachedCharacters()

        if (cachedCharacters) {
            return cachedCharacters
        }

        const result = await $fetch<Result<CharacterList[]>>('/api/character')

        if (result.type === 'error') {
            throw new Error(result.error)
        }

        saveCharacters(result.content)

        return result.content
    }

    const loadCharacters = async () => {
        characters.value = await fetchCharacters()
    }

    const invalidateCharacters = () => {
        if (!import.meta.client) {
            return
        }

        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_TIMESTAMP_KEY)
        characters.value = []
    }

    return {
        fetchCharacters,
        getCachedCharacters,
        saveCharacters,
        invalidateCharacters,
        loadCharacters,
        characters,
    }
}
