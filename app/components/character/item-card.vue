<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue'
import { capitalize } from 'vue'

import type { ItemRarity } from '~~/shared/types/item-rarity'
import { itemRarityLabels } from '~/utils/item-rarity-labels'

type ItemType =
    'ARMA CURTA' | 'ARMA LONGA' | 'ARMA PESADA' | 'DIST. CURTA' | 'DIST. LONGA' | 'OUTRO'

const damages = {
    'ARMA CURTA': {
        common: '1d8 + FOR',
        forged: '2d6 + FOR',
        purified: '2d8 + FOR',
        relic: '2d10 + FOR',
    },
    'ARMA LONGA': {
        common: '1d10 + FOR',
        forged: '2d8 + FOR',
        purified: '2d10 + FOR',
        relic: '3d8 + FOR',
    },
    'ARMA PESADA': {
        common: '1d12 + FOR',
        forged: '2d10 + FOR',
        purified: '3d8 + FOR',
        relic: '3d10 + FOR',
    },
    'DIST. CURTA': {
        common: '1d8 + AGI',
        forged: '2d6 + AGI',
        purified: '2d8 + AGI',
        relic: '2d10 + AGI',
    },
    'DIST. LONGA': {
        common: '1d12 + AGI',
        forged: '2d8 + AGI',
        purified: '2d10 + AGI',
        relic: '3d8 + AGI',
    },
}

const props = defineProps<{
    type: ItemType
    rarity?: ItemRarity
    name: string
    description?: string
    onRemove: () => void
}>()

const rarityString = computed(() => itemRarityLabels[props.rarity ?? 'common'])

const itemUsage = computed(() => {
    if (props.type === 'OUTRO') return props.description ?? ''

    return damages[props.type][props.rarity ?? 'common']
})
</script>

<template>
    <div class="col-span-1 flex flex-col gap-3.5 rounded-2xl border border-t200 bg-white p-4">
        <div class="flex items-center gap-2">
            <Badge>{{ props.type }}</Badge>
            <Badge v-if="props.rarity" :rarity="props.rarity">{{ capitalize(rarityString) }}</Badge>

            <button
                type="button"
                class="ml-auto flex cursor-pointer items-center justify-center rounded-md p-2 text-t700 hover:bg-t100"
                @click="onRemove"
            >
                <PhTrash weight="bold" class="size-4" />
            </button>
        </div>

        <h3 class="font-title text-xl font-bold text-t900">{{ capitalizeAllWords(props.name) }}</h3>

        <p v-if="props.type === 'OUTRO'" class="text-sm text-t800">{{ itemUsage }}</p>
        <p v-else class="text-sm text-t800">
            Dano <span class="font-title text-xl font-bold">{{ itemUsage }}</span>
        </p>
    </div>
</template>
