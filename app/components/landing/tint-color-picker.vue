<script setup lang="ts">
import { PhWarningCircle } from '@phosphor-icons/vue'

defineProps<{ missingTint: boolean }>()

const currentTint = defineModel<string | undefined>('currentTint', {
    default: undefined,
})
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <div class="flex w-full items-center justify-between">
            <TextLabel>COR DE DESTAQUE</TextLabel>

            <strong
                v-if="missingTint"
                class="flex items-center justify-center gap-1 text-xs font-bold text-rose-700"
            >
                <PhWarningCircle weight="bold" />
                <span>A cor é obrigatória</span>
            </strong>
        </div>

        <TintPicker v-model:current-tint="currentTint" />
    </div>
</template>
