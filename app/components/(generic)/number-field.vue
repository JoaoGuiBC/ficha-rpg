<script setup lang="ts">
import { PhMinus, PhPlus } from '@phosphor-icons/vue'

const value = defineModel('value', { type: Number, required: true, default: 0 })
</script>

<template>
    <NumberFieldRoot
        v-model="value"
        class="flex w-24 items-center justify-center rounded-xl border border-t200 bg-white px-2 py-1"
    >
        <NumberFieldDecrement
            :disabled="value === 0"
            class="size-9 cursor-pointer text-t700 disabled:cursor-not-allowed disabled:text-t300"
        >
            <PhMinus weight="bold" />
        </NumberFieldDecrement>

        <NumberFieldInput
            readonly
            class="w-full text-center text-base font-bold text-t900 outline-none select-none"
        />

        <NumberFieldIncrement
            class="size-9 cursor-pointer text-t700 disabled:cursor-not-allowed disabled:text-t300"
        >
            <PhPlus weight="bold" />
        </NumberFieldIncrement>
    </NumberFieldRoot>
</template>
