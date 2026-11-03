<script setup lang="ts">
import { PhMinus, PhPlus } from '@phosphor-icons/vue'

const level = defineModel('level', { required: true, default: 0, type: Number })

const props = defineProps<{
    name: string
    isHighestAttr?: boolean
}>()

const diceValue = computed(() => {
    if (level.value === 1) return `${level.value}d20`

    return `${level.value}d20, melhor`
})

const classes = computed(() => {
    if (props.isHighestAttr) {
        return {
            card: 'border-t700 bg-t700 text-white',
            title: 'text-white',
            button: 'bg-t600 text-white',
        }
    } else {
        return {
            card: 'border-t200 bg-white text-t800',
            title: 'text-t900',
            button: 'bg-t100 text-t700',
        }
    }
})
</script>

<template>
    <div
        :class="classes.card"
        class="col-span-1 flex flex-col items-center justify-center gap-0.5 rounded-2xl border px-2 py-4 transition-colors"
    >
        <h3 :class="classes.title" class="font-title text-4xl font-bold">{{ level }}</h3>

        <TextLabel :color="classes.title">{{ name }}</TextLabel>

        <p v-if="level === 0" class="text-xs">2d20, <span class="font-semibold">pior</span></p>
        <p v-else class="text-xs">{{ diceValue }}</p>

        <div class="mt-3 flex items-center justify-center gap-1.5">
            <button
                type="button"
                :disabled="level === 0"
                :class="classes.button"
                class="flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:select-none"
                @click="() => level--"
            >
                <PhMinus weight="bold" class="size-4" />
            </button>
            <button
                type="button"
                :class="classes.button"
                class="flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:select-none"
                @click="() => level++"
            >
                <PhPlus weight="bold" class="size-4" />
            </button>
        </div>
    </div>
</template>
