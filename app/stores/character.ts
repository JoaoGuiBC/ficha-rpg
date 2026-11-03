import { createId } from '@paralleldrive/cuid2'
import { toRaw } from 'vue'

const { deleteItems, deleteSkills, patch, patchSkills, postItems, postSkills } = useCharacter()

const emptyValue: CharacterType = {
    name: '',
    description: '',
    tint: '',
    origin: '',
    id: '',
    currentPV: 0,
    currentPM: 0,
    usedImpetus: 0,
    pvTrainings: 0,
    pmTrainings: 0,
    impetusTrainings: 0,
    defenseTrainings: 0,
    strength: 0,
    agility: 0,
    vitality: 0,
    intelligence: 0,
    spirit: 0,
    notes1: '',
    notes2: '',
}

type Skill = { id: string; name: string; level: number }
type Item = {
    id: string
    name: string
    type: ItemCategory
    rarity?: ItemRarity
    description?: string
}
type CharacterChanges = Partial<Omit<CharacterType, 'id'>>

const characterKeys = (Object.keys(emptyValue) as Array<keyof CharacterType>).filter(
    key => key !== 'id',
) as Array<keyof CharacterChanges>

export const useCharacterStore = defineStore('character', () => {
    const characterCache = ref<CharacterType | undefined>()
    const character = ref<CharacterType>(structuredClone(toRaw(emptyValue)))

    const skillListCache = ref<Skill[]>([])
    const skillList = ref<Skill[]>([])

    const itemListCache = ref<Item[]>([])
    const itemList = ref<Item[]>([])

    function setCharacter(data: CharacterType) {
        character.value = structuredClone(toRaw(data))
        characterCache.value = structuredClone(toRaw(data))
    }

    function setSkills(data: Skill[]) {
        skillListCache.value = structuredClone(toRaw(data))
        skillList.value = structuredClone(toRaw(data))
    }

    function setItems(data: Item[]) {
        itemListCache.value = structuredClone(toRaw(data))
        itemList.value = structuredClone(toRaw(data))
    }

    function setSheet(sheet: CharacterSheet) {
        setCharacter(sheet.character)
        setSkills(sheet.skills.map(({ id, name, level }) => ({ id, name, level })))
        setItems(
            sheet.items.map(({ id, name, type, rarity, description }) => ({
                id,
                name,
                type,
                rarity,
                description: description ?? undefined,
            })),
        )
    }

    function addSkill(data: Omit<Skill, 'id'>) {
        skillList.value = [...skillList.value, { id: createId(), ...data }].sort((skillA, skillB) =>
            skillA.name.localeCompare(skillB.name),
        )
    }

    function removeSkill(skillId: string) {
        skillList.value = skillList.value.filter(skill => skill.id !== skillId)
    }

    function addItem(data: Omit<Item, 'id'>) {
        itemList.value = [...itemList.value, { id: createId(), ...data }].sort((itemA, itemB) =>
            itemA.name.localeCompare(itemB.name),
        )
    }

    function removeItem(item: Item) {
        itemList.value = itemList.value.filter(currentItem => currentItem.id !== item.id)
    }

    async function saveChanges() {
        const cache = characterCache.value

        if (!cache) return

        const characterId = character.value.id
        const errors: string[] = []
        let hasSaved = false

        async function sync<T>(request: Promise<Result<T>>, onSaved: () => void) {
            const result = await request

            if (result.type === 'error') {
                errors.push(result.error)
                return
            }

            onSaved()
            hasSaved = true
        }

        const changes: CharacterChanges = {}

        for (const key of characterKeys) {
            if (character.value[key] !== cache[key]) {
                Object.assign(changes, { [key]: character.value[key] })
            }
        }

        if (Object.keys(changes).length > 0) {
            await sync(patch(characterId, changes), () => {
                characterCache.value = { ...cache, ...changes }
            })
        }

        const cachedSkills = skillListCache.value
        const currentSkills = skillList.value

        const skillsToAdd = currentSkills
            .filter(skill => !cachedSkills.some(cached => cached.id === skill.id))
            .map(skill => ({ ...skill }))
        const skillsToPatch = currentSkills
            .filter(skill =>
                cachedSkills.some(cached => cached.id === skill.id && cached.level !== skill.level),
            )
            .map(skill => ({ id: skill.id, level: skill.level }))
        const skillsToRemove = cachedSkills
            .filter(cached => !currentSkills.some(skill => skill.id === cached.id))
            .map(cached => cached.id)

        if (skillsToAdd.length > 0) {
            await sync(postSkills(characterId, skillsToAdd), () => {
                skillListCache.value = [...skillListCache.value, ...skillsToAdd]
            })
        }

        if (skillsToPatch.length > 0) {
            await sync(patchSkills(characterId, skillsToPatch), () => {
                skillListCache.value = skillListCache.value.map(cached => {
                    const updated = skillsToPatch.find(skill => skill.id === cached.id)

                    return updated ? { ...cached, level: updated.level } : cached
                })
            })
        }

        if (skillsToRemove.length > 0) {
            await sync(deleteSkills(characterId, skillsToRemove), () => {
                skillListCache.value = skillListCache.value.filter(
                    cached => !skillsToRemove.includes(cached.id),
                )
            })
        }

        const cachedItems = itemListCache.value
        const currentItems = itemList.value

        const itemsToAdd = currentItems
            .filter(item => !cachedItems.some(cached => cached.id === item.id))
            .map(item => ({ ...item }))
        const itemsToRemove = cachedItems
            .filter(cached => !currentItems.some(item => item.id === cached.id))
            .map(cached => cached.id)

        if (itemsToAdd.length > 0) {
            await sync(postItems(characterId, itemsToAdd), () => {
                itemListCache.value = [...itemListCache.value, ...itemsToAdd]
            })
        }

        if (itemsToRemove.length > 0) {
            await sync(deleteItems(characterId, itemsToRemove), () => {
                itemListCache.value = itemListCache.value.filter(
                    cached => !itemsToRemove.includes(cached.id),
                )
            })
        }

        if (errors.length > 0) {
            throw new Error(errors.join('; '))
        }

        if (!hasSaved) return

        return {
            title: 'SALVO',
            description: `Informações de ${capitalizeAllWords(character.value.name)} salvas`,
        }
    }

    let saveQueue: Promise<unknown> = Promise.resolve()

    function applyDifferences() {
        const run = saveQueue.then(saveChanges)

        saveQueue = run.catch(() => undefined)

        return run
    }

    async function clean() {
        const message = await applyDifferences()

        character.value = structuredClone(toRaw(emptyValue))
        characterCache.value = undefined
        skillListCache.value = []
        skillList.value = []
        itemListCache.value = []
        itemList.value = []

        return message
    }

    return {
        characterCache,
        character,
        setCharacter,
        setSheet,
        skillList,
        addSkill,
        removeSkill,
        itemList,
        addItem,
        removeItem,
        clean,
        applyDifferences,
    }
})
