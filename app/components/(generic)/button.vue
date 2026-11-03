<script setup lang="ts">
import { PhSpinner } from '@phosphor-icons/vue'
import { computed } from 'vue'

const {
    variant = 'primary',
    type = 'button',
    isLoading = false,
} = defineProps<{
    variant?: 'primary' | 'secondary' | 'warning'
    type?: 'button' | 'submit' | 'reset'
    isLoading?: boolean
}>()

const classes = computed(
    () =>
        ({
            primary: `bg-t800 hover:bg-t50 text-t50 hover:text-t900 border-transparent hover:border-t200`,
            secondary: `bg-t50 hover:bg-t800 text-t900 hover:text-t50 border-t200 hover:border-transparent`,
            warning: `bg-rose-700 hover:bg-rose-50 text-t50 hover:text-rose-800 border-transparent hover:border-rose-200`,
        })[variant],
)
</script>

<template>
    <button
        v-bind="$attrs"
        :type="type"
        :class="classes"
        :disabled="isLoading"
        class="group relative flex h-fit w-fit cursor-pointer items-center justify-center rounded-xl border px-5 py-3 text-base leading-none font-semibold disabled:pointer-events-none disabled:contrast-[0.7] disabled:grayscale"
    >
        <PhSpinner
            v-if="isLoading"
            weight="bold"
            class="absolute animate-[spin_2s_linear_infinite]"
        />

        <div
            :aria-hidden="isLoading"
            class="flex h-fit w-fit items-center justify-center gap-2 group-disabled:opacity-0"
        >
            <slot />
        </div>
    </button>
</template>
