<script setup lang="ts">
const { size = 'md' } = defineProps<{ size?: 'sm' | 'md' }>()

const currentTint = defineModel<string | undefined>('currentTint', {
    default: undefined,
})

const tints = [
    { value: 'red', label: 'Vermelho' },
    { value: 'amber', label: 'Âmbar' },
    { value: 'emerald', label: 'Esmeralda' },
    { value: 'teal', label: 'Verde-azulado' },
    { value: 'sky', label: 'Céu' },
    { value: 'blue', label: 'Azul' },
    { value: 'indigo', label: 'Índigo' },
    { value: 'violet', label: 'Violeta' },
    { value: 'pink', label: 'Rosa' },
    { value: 'slate', label: 'Ardósia' },
    { value: 'mauve', label: 'Malva' },
    { value: 'olive', label: 'Oliva' },
]

const sizeClass = computed(() => (size === 'md' ? 'size-12' : 'size-9'))
</script>

<template>
    <RadioGroupRoot
        v-model="currentTint"
        class="grid grid-cols-6 gap-2"
        aria-label="Selecione qual a cor de destaque"
    >
        <RadioGroupItem
            v-for="tint in tints"
            :id="tint.value"
            :key="tint.value"
            :value="tint.value"
            :data-tint="tint.value"
            :aria-label="tint.label"
            :class="sizeClass"
            class="cursor-pointer justify-self-center rounded-full bg-t500 outline-2 outline-offset-2 outline-transparent data-[state=checked]:outline-t500"
        />
    </RadioGroupRoot>
</template>
