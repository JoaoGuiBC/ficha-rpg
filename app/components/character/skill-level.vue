<script setup lang="ts">
const props = defineProps<{ skillName: string }>()
const bonus = defineModel<number>('bonus', { default: 5 })

const options: { value: number; label: string }[] = [
    { value: 5, label: '+5' },
    { value: 10, label: '+10' },
]

const selected = computed({
    get: () => String(bonus.value),
    set: v => {
        if (v) bonus.value = Number(v) as number
    },
})

const index = computed(() => options.findIndex(o => o.value === bonus.value))
</script>

<template>
    <ToggleGroupRoot
        v-model="selected"
        type="single"
        :aria-label="`Bônus de ${props.skillName}`"
        class="relative grid w-24 grid-cols-2 rounded-lg bg-t100 p-1"
    >
        <span
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-1 w-[calc((50%)-0.25rem)] rounded-lg bg-t700 transition-transform duration-200 ease-out motion-reduce:transition-none"
            :style="{ transform: `translateX(calc((${index * 100}%) + 0.25rem))` }"
        />

        <ToggleGroupItem
            v-for="option in options"
            :key="option.value"
            :value="String(option.value)"
            class="z-10 min-h-7 cursor-pointer rounded-lg px-3 text-xs font-bold text-t800 transition-colors duration-200 data-[state=on]:text-white motion-reduce:transition-none"
        >
            {{ option.label }}
        </ToggleGroupItem>
    </ToggleGroupRoot>
</template>
