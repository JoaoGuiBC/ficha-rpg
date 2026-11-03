<script setup lang="ts">
import { PhCaretDown } from '@phosphor-icons/vue'

const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)

useHead({
    htmlAttrs: {
        'data-tint': () => character.value.tint,
    },
})
</script>

<template>
    <PopoverRoot>
        <PopoverTrigger
            class="flex cursor-pointer items-center gap-2 rounded-full border border-t200 bg-white p-3 hover:bg-t100"
        >
            <div aria-hidden class="size-3.5 rounded-full bg-t500" />
            <span class="text-sm font-semibold text-t800">Cor: {{ character.tint }}</span>
            <PhCaretDown weight="bold" class="size-3.5 text-t700" />
        </PopoverTrigger>

        <PopoverPortal>
            <PopoverContent
                align="end"
                :side-offset="8"
                class="popover-content rounded-xl border border-t200 bg-white p-4 shadow-xl"
            >
                <TintPicker v-model="character.tint" size="sm" />
            </PopoverContent>
        </PopoverPortal>
    </PopoverRoot>
</template>
