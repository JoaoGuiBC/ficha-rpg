<script setup lang="ts">
import { useToastManager } from 'reka-ui'
import { capitalize } from 'vue'

useHead({
    htmlAttrs: {
        'data-tint': '',
    },
})

const isLoading = ref(true)

const toast = useToastManager()
const characterStore = useCharacterStore()
const { characters, loadCharacters, invalidateCharacters } = useCharactersCache()

onMounted(async () => {
    try {
        const message = await characterStore.clean()

        if (message) {
            invalidateCharacters()
            toast.add(message)
        }
    } catch {
        toast.add({
            title: 'Salvar dados',
            description: 'Ocorreu um erro interno ao salvar dados do personagem.',
            status: 'error',
        })
    }

    try {
        await loadCharacters()
    } catch {
        toast.add({
            title: 'Listagem de personagens',
            description: 'Ocorreu um erro interno ao listar os personagens.',
            status: 'error',
        })
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="mx-auto flex size-full max-w-6xl flex-col items-center gap-10">
        <LandingHeader />

        <main class="grid w-full grid-cols-2 gap-5 lg:grid-cols-3">
            <LandingCharacterCard
                v-for="c in characters"
                :id="c.id"
                :key="c.id"
                :tint="c.tint"
                :name="capitalizeAllWords(c.name)"
                :description="c.description"
                :origin="capitalize(c.origin)"
                :status="{ pv: c.pv, pm: c.pm, def: c.def }"
            />

            <LandingAddCharacterButton />
        </main>

        <LandingNewCharacterDialog />
    </div>
</template>
