<script setup lang="ts">
import { useToastManager } from 'reka-ui'

const route = useRoute()
const toast = useToastManager()
const characterStore = useCharacterStore()
const { getSheet } = useCharacter()
const { isNewCharacterDialogOpen } = useDialogs()

let differencesTimer: ReturnType<typeof setInterval> | undefined
let isApplyingDifferences = false

async function applyDifferences() {
    if (isApplyingDifferences) return

    isApplyingDifferences = true

    try {
        const message = await characterStore.applyDifferences()

        if (message) {
            toast.add(message)
        }
    } catch (error) {
        toast.add({
            title: 'Salvar dados',
            description: error instanceof Error ? error.message : 'Ocorreu um erro interno.',
            status: 'error',
        })
    } finally {
        isApplyingDifferences = false
    }
}

onMounted(async () => {
    isNewCharacterDialogOpen.value = false

    differencesTimer = setInterval(applyDifferences, 15 * 60 * 1000)

    const id = String(route.params.id ?? '')

    if (characterStore.characterCache?.id === id) {
        return
    }

    try {
        const result = await getSheet(id)

        if (result.type === 'error') {
            toast.add({
                title: 'Erro ao buscar personagem',
                description: result.error,
                status: 'error',
            })

            navigateTo('/')
            return
        }

        characterStore.setSheet(result.content)
    } catch (error) {
        toast.add({
            title: 'Erro ao buscar personagem',
            description: error instanceof Error ? error.message : 'Ocorreu um erro interno.',
            status: 'error',
        })

        navigateTo('/')
    }
})

onUnmounted(() => {
    if (differencesTimer) {
        clearInterval(differencesTimer)
    }
})
</script>

<template>
    <div>
        <CharacterHeader />

        <main class="mt-9 flex flex-col gap-9">
            <CharacterStatusSection />

            <CharacterAttributeSection />

            <CharacterSkillSection />

            <CharacterItemSection />

            <CharacterNotesSection />
        </main>

        <CharacterNewSkillDialog />
        <CharacterNewItemDialog />
    </div>
</template>
