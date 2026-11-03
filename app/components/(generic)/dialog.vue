<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue'
import {
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
} from 'reka-ui'

defineProps<{
    title: string
    description?: string
    tint?: string
}>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
    <DialogRoot v-model:open="open">
        <DialogPortal>
            <DialogOverlay class="dialog-overlay fixed inset-0 z-10 bg-zinc-900/40" />

            <DialogContent
                :data-tint="tint"
                class="dialog-content fixed top-1/2 left-1/2 z-20 w-[min(400px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-t50 p-6 shadow-xl"
            >
                <header class="flex items-center justify-between">
                    <DialogTitle class="font-title text-2xl font-bold text-t900">
                        {{ title }}
                    </DialogTitle>

                    <button
                        type="button"
                        class="flex cursor-pointer items-center justify-center rounded-md p-1 text-t600 hover:bg-t200"
                        @click="() => (open = false)"
                    >
                        <PhX class="size-4.5" />
                    </button>
                </header>

                <DialogDescription class="sr-only">
                    {{ description ?? title }}
                </DialogDescription>

                <slot />
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
