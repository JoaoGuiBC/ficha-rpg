<script setup lang="ts">
const props = defineProps<{
    name: string
    description: string
    tint?: string
    variant?: 'primary' | 'secondary'
}>()

const firstLetter = computed(() => props.name.charAt(0).toUpperCase())

const classes = computed(
    () =>
        ({
            primary: {
                avatar: 'size-14 bg-t100 text-2xl text-t700',
                title: 'text-2xl text-t900',
                description: 'text-t600',
            },
            secondary: {
                avatar: 'size-18 bg-t700 text-4xl text-t50',
                title: 'text-5xl text-t900',
                description: 'text-t800',
            },
        })[props.variant ?? 'primary'],
)
</script>

<template>
    <div class="flex items-center">
        <div
            :data-tint="tint"
            :class="classes.avatar"
            class="flex items-center justify-center rounded-2xl font-title leading-0 font-bold"
        >
            {{ firstLetter }}
        </div>

        <div class="flex flex-1 flex-col px-3.5">
            <h3 :class="classes.title" class="font-title font-bold">
                {{ name }}
            </h3>
            <span :class="classes.description" class="text-sm">{{ description }}</span>
        </div>
    </div>
</template>
