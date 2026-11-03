<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue'
import { useToastManager } from 'reka-ui'

const toast = useToastManager()
const { remove } = useDeletion()
const { invalidateCharacters, loadCharacters } = useCharactersCache()
const { isDeletionDialogOpen, deletionTitle, deletionDescription, deletionUrl } = useDialogs()

const isLoading = ref(false)

async function handleDeletion() {
    isLoading.value = true

    const result = await remove(deletionUrl.value)

    if (result.type === 'error') {
        toast.add({
            title: 'Não foi possível excluir',
            description: result.error,
            status: 'error',
        })

        isLoading.value = false

        return
    }

    if (result.content.type === 'character') {
        toast.add({
            title: 'Personagem excluído',
            description: result.content.message,
        })

        invalidateCharacters()
        await loadCharacters()

        isLoading.value = false
        isDeletionDialogOpen.value = false
        return
    }

    isLoading.value = false
}
</script>

<template>
    <Dialog v-model:open="isDeletionDialogOpen" :title="deletionTitle">
        <div class="mt-4 flex flex-col gap-5">
            <div class="flex gap-2.5">
                <div class="rounded-2xl bg-rose-100 p-3.5 text-rose-700">
                    <PhTrash class="size-6" weight="bold" />
                </div>

                <p class="text-base/normal text-t800">{{ deletionDescription }}</p>
            </div>

            <div class="flex items-center justify-end gap-2.5">
                <Button variant="secondary" @click="() => (isDeletionDialogOpen = false)">
                    Cancelar
                </Button>

                <Button :is-loading="isLoading" variant="warning" @click="handleDeletion">
                    Excluir
                </Button>
            </div>
        </div>
    </Dialog>
</template>
