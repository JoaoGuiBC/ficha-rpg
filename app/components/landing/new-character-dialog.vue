<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToastManager } from 'reka-ui'

import { newCharacterSchema } from '~~/shared/schemas/add-character.ts'
import { origins } from '~~/shared/data/origins.ts'

import TintColorPicker from './tint-color-picker.vue'

const serverErrors = ref<Record<string, string | string[]>>({})
const currentTint = ref<string | undefined>()
const currentOrigin = ref<string | undefined>('')
const missingTint = ref<boolean>(false)
const missingOrigin = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const toast = useToastManager()
const { post } = useCharacter()
const { isNewCharacterDialogOpen } = useDialogs()
const { invalidateCharacters, loadCharacters } = useCharactersCache()

const store = useCharacterStore()

const originsNames = computed(() => origins.map(origin => origin.name))

watch(isNewCharacterDialogOpen, isOpen => {
    if (!isOpen) {
        serverErrors.value = {}
        currentTint.value = undefined
        missingTint.value = false
        currentOrigin.value = undefined
        missingOrigin.value = false
    }
})
watch(currentTint, tint => {
    if (tint) missingTint.value = false
})
watch(currentOrigin, origin => {
    if (origin) missingOrigin.value = false
})

async function onFormSubmit(values: Record<string, unknown>) {
    isLoading.value = true

    const result = newCharacterSchema.safeParse({
        ...values,
        tint: currentTint.value,
        origin: currentOrigin.value,
    })

    if (!result.success) {
        if (result.error) {
            serverErrors.value = result.error.issues.reduce<Record<string, string[]>>(
                (errors, issue) => {
                    const field = issue.path[0]

                    if (typeof field === 'string') {
                        errors[field] ??= []
                        errors[field].push(issue.message)
                    }

                    return errors
                },
                {},
            )
        }

        if (!currentTint.value) {
            missingTint.value = true
        }
        if (!currentOrigin.value) {
            missingOrigin.value = true
        }

        isLoading.value = false
        return
    }

    const character = await post(result.data)

    if (character.type === 'error') {
        toast.add({
            title: 'Não foi possível criar',
            description: character.error,
            status: 'error',
        })
    } else {
        toast.add({
            title: 'Personagem criado!',
            description: `${character.content.name} criado com sucesso`,
        })

        invalidateCharacters()
        await loadCharacters()
        store.setCharacter(character.content)

        return navigateTo(`/personagem/${character.content.id}`)
    }

    isLoading.value = false
}
</script>

<template>
    <Dialog v-model:open="isNewCharacterDialogOpen" title="Novo personagem" :tint="currentTint">
        <FormRoot
            class="z-30 mt-5 flex flex-col gap-5"
            :errors="serverErrors"
            @form-submit="onFormSubmit"
        >
            <Input name="name" label="Nome" />
            <Input name="description" label="Descrição" />

            <Select
                v-model:current-value="currentOrigin"
                label="Origem"
                :options="originsNames"
                :tint="currentTint"
                :is-errored="missingOrigin"
            />

            <TintColorPicker v-model:current-tint="currentTint" :missing-tint="missingTint" />

            <div class="flex w-full items-center justify-end gap-2.5">
                <Button variant="secondary" @click="() => (isNewCharacterDialogOpen = false)">
                    Cancelar
                </Button>

                <Button variant="primary" type="submit" :is-loading="isLoading">
                    Criar personagem
                </Button>
            </div>
        </FormRoot>
    </Dialog>
</template>
