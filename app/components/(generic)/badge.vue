<script setup lang="ts">
import type { ItemRarity } from '~~/shared/types/item-rarity'

const { rarity = 'common' } = defineProps<{ rarity?: ItemRarity }>()

const classes = ref({
    common: 'bg-t100 text-t800',
    forged: 'bg-t300 text-t900',
    purified: 'bg-t700 text-white',
    relic: 'bg-t900 text-white',
})
</script>

<template>
    <span class="rounded-full px-2.5 py-1 text-xs font-bold" :class="classes[rarity]">
        <slot />
    </span>
</template>
