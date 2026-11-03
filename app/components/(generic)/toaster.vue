<script setup lang="ts">
import { PhCheck, PhWarningCircle } from '@phosphor-icons/vue'
import { ToastDescription, ToastRoot, ToastTitle, ToastViewport, useToastManager } from 'reka-ui'

const { toasts } = useToastManager()
</script>

<template>
    <ToastRoot
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        class="toast-content z-40 flex gap-3 rounded-2xl border p-4 shadow-lg"
        :class="toast.status === 'error' ? 'border-rose-200 bg-rose-50' : 'border-t200 bg-white'"
    >
        <div
            class="size-fit rounded-full p-2"
            :class="toast.status === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-t100 text-t800'"
        >
            <PhWarningCircle v-if="toast.status === 'error'" class="size-4" weight="bold" />
            <PhCheck v-else class="size-4" weight="bold" />
        </div>

        <div class="flex flex-col gap-0.5">
            <ToastTitle
                class="font-bold"
                :class="toast.status === 'error' ? 'text-rose-700' : 'text-t900'"
            >
                {{ toast.title }}
            </ToastTitle>
            <ToastDescription :class="toast.status === 'error' ? 'text-rose-800' : 'text-t800'">
                {{ toast.description }}
            </ToastDescription>
        </div>
    </ToastRoot>

    <ToastViewport class="fixed right-4 bottom-4 z-50 flex w-96 flex-col gap-2 outline-none" />
</template>
