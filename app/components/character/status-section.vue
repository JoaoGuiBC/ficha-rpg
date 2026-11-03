<script setup lang="ts">
const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)

const toggledImpetus = ref<number[]>([])

const impetus = computed(() =>
    Array.from({ length: 3 + character.value.impetusTrainings }, (_, i) => i),
)

const maxPV = computed(() => character.value.vitality * 5 + 10 + character.value.pvTrainings * 5)
const maxPM = computed(() => {
    return (
        (character.value.intelligence + character.value.spirit) * 3 +
        character.value.pmTrainings * 3
    )
})
const def = computed(() => character.value.agility + 10 + character.value.defenseTrainings * 5)

const pvPercentage = computed(() => {
    const percentage = (character.value.currentPV / maxPV.value) * 100
    if (percentage <= 100) return percentage

    return 100
})
const pmPercentage = computed(() => {
    const percentage = (character.value.currentPM / maxPM.value) * 100
    if (percentage <= 100) return percentage

    return 100
})

watch(impetus, () => {
    toggledImpetus.value = [...toggledImpetus.value.filter(value => value < impetus.value.length)]
})

watch(
    () => character.value.id,
    () => {
        const used = Math.min(character.value.usedImpetus, impetus.value.length)

        toggledImpetus.value = Array.from({ length: used }, (_, i) => i)
    },
    { immediate: true },
)

watch(toggledImpetus, positions => {
    character.value.usedImpetus = positions.length
})
</script>

<template>
    <section class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CharacterStatusCard
            v-model:training="character.pvTrainings"
            label="PV · VIDA"
            training-description="VIG × 5 + 10 · +5 por treino"
        >
            <div class="flex items-center justify-start font-title text-4xl font-bold text-t500">
                <input
                    v-model.number="character.currentPV"
                    class="field-sizing-content min-w-7 text-t900"
                />
                <span>&nbsp;/ {{ maxPV }}</span>
            </div>

            <Progress v-model:progress="pvPercentage" />
        </CharacterStatusCard>

        <CharacterStatusCard
            v-model:training="character.pmTrainings"
            label="PM · MAGIA"
            training-description="(INT + ESP) × 3 · +3 por treino"
        >
            <div class="flex items-center justify-start font-title text-4xl font-bold text-t500">
                <input
                    v-model.number="character.currentPM"
                    class="field-sizing-content min-w-7 text-t900"
                />
                <span>&nbsp;/ {{ maxPM }}</span>
            </div>

            <Progress v-model:progress="pmPercentage" />
        </CharacterStatusCard>

        <CharacterStatusCard
            v-model:training="character.impetusTrainings"
            label="ÍMPETO"
            training-description="Reserva 3 · +1 por treino"
        >
            <ToggleGroupRoot v-model="toggledImpetus" type="multiple" class="mt-3 space-x-2">
                <ToggleGroupItem
                    v-for="pip in impetus"
                    :key="pip"
                    class="size-7 cursor-pointer rounded-full border-2 border-t600 bg-t600 data-[state=on]:bg-transparent"
                    aria-label="toggle impetus"
                    :value="pip"
                />
            </ToggleGroupRoot>
        </CharacterStatusCard>

        <CharacterStatusCard
            v-model:training="character.defenseTrainings"
            label="DEFESA"
            training-description="AGI + 10 · +5 por treino"
        >
            <strong class="font-title text-4xl font-bold text-t900">{{ def }}</strong>
        </CharacterStatusCard>
    </section>
</template>
