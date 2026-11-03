<script setup lang="ts">
const { name, label, placeholder } = defineProps<{
    name: string
    label: string
    placeholder?: string
}>()

const value = defineModel<string>('value', {
    default: '',
})
</script>

<template>
    <FieldRoot :name="name" class="flex w-full flex-col gap-2">
        <FieldLabel as-child>
            <TextLabel>{{ label }}</TextLabel>
        </FieldLabel>

        <FieldControl
            v-model="value"
            as="textarea"
            :placeholder="placeholder"
            class="min-h-40 w-full resize-y rounded-2xl border border-t200 bg-white p-4 text-sm/normal text-t900 placeholder:text-t800/70 focus:outline-2 focus:outline-offset-2 focus:outline-t500"
        />
    </FieldRoot>
</template>
