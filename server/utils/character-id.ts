import type { H3Event } from 'h3'

import { characterIdSchema } from '~~/shared/schemas/character-id'

export function getCharacterId(event: H3Event): string | undefined {
    const parsed = characterIdSchema.safeParse(getRouterParam(event, 'id'))

    return parsed.success ? parsed.data : undefined
}
