<script setup lang="ts">
const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)

const highestAttrNames = computed(() => {
    const attrs = [
        { name: 'FOR', level: character.value.strength },
        { name: 'AGI', level: character.value.agility },
        { name: 'VIG', level: character.value.vitality },
        { name: 'INT', level: character.value.intelligence },
        { name: 'ESP', level: character.value.spirit },
    ]

    const highestLevel = Math.max(...attrs.map(attr => attr.level))

    return new Set(attrs.filter(attr => attr.level === highestLevel).map(attr => attr.name))
})
</script>

<template>
    <section class="flex flex-col gap-3.5">
        <TextLabel>ATRIBUTOS</TextLabel>

        <div class="grid grid-cols-5 gap-3">
            <CharacterAttributeCard
                v-model:level="character.strength"
                :is-highest-attr="highestAttrNames.has('FOR')"
                name="FOR"
            />

            <CharacterAttributeCard
                v-model:level="character.agility"
                :is-highest-attr="highestAttrNames.has('AGI')"
                name="AGI"
            />

            <CharacterAttributeCard
                v-model:level="character.vitality"
                :is-highest-attr="highestAttrNames.has('VIG')"
                name="VIG"
            />

            <CharacterAttributeCard
                v-model:level="character.intelligence"
                :is-highest-attr="highestAttrNames.has('INT')"
                name="INT"
            />

            <CharacterAttributeCard
                v-model:level="character.spirit"
                :is-highest-attr="highestAttrNames.has('ESP')"
                name="ESP"
            />
        </div>
    </section>
</template>
