<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

const { openNewCharacterDialog } = useDialogs()
</script>

<template>
    <button
        type="button"
        class="col-span-1 flex min-h-53 w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-t300 text-t600 transition-all hover:border-solid"
        @click="openNewCharacterDialog"
    >
        <PhPlus weight="bold" class="size-6" />

        <span class="text-base font-semibold">Adicionar personagem</span>
    </button>
</template>
