<script setup lang="ts">
defineProps<{
    label: string
    trainingDescription: string
}>()
const training = defineModel('training', { type: Number, required: true, default: 0 })
</script>

<template>
    <div class="col-span-1 flex flex-col rounded-2xl bg-t100 p-5">
        <TextLabel class="mb-2.5">{{ label }}</TextLabel>

        <slot />

        <span class="text-xs text-t800">{{ trainingDescription }}</span>

        <div class="mt-auto flex items-center justify-between">
            <TextLabel>TREINOS</TextLabel>

            <NumberField v-model:value="training" />
        </div>
    </div>
</template>
