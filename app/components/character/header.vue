<script setup lang="ts">
import { PhCaretLeft } from '@phosphor-icons/vue'

import { origins } from '~~/shared/data/origins'

const characterStore = useCharacterStore()

const originName = computed(() => `ORIGEM · ${characterStore.character.origin.toUpperCase()}`)
const originAbility = computed(() => {
    const ability =
        origins.find(origin => origin.name === characterStore.character.origin)?.ability ?? ''
    const splitAbility = ability.split('-')

    return {
        title: splitAbility[0],
        text: `- ${splitAbility[1] ?? ''}`,
    }
})
</script>

<template>
    <header class="flex flex-col gap-9">
        <div class="flex items-center justify-between gap-2">
            <NuxtLink
                to="/"
                class="flex items-center justify-center text-sm font-semibold text-t700"
            >
                <PhCaretLeft weight="bold" />
                <span>Personagens</span>
            </NuxtLink>

            <CharacterTintPopover />
        </div>

        <div class="flex items-end justify-between">
            <CharacterInfo
                :name="capitalizeAllWords(characterStore.character.name)"
                :description="characterStore.character.description"
                variant="secondary"
            />

            <div class="flex max-w-lg flex-col gap-0.5 rounded-2xl bg-t100 px-4 py-3">
                <TextLabel>{{ originName }}</TextLabel>
                <p class="text-sm text-t900">
                    <span class="font-bold">{{ originAbility.title }}</span>
                    {{ originAbility.text }}
                </p>
            </div>
        </div>
    </header>
</template>
