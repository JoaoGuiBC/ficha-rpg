<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

const { openNewItemDialog } = useDialogs()
const characterStore = useCharacterStore()
const { itemList } = storeToRefs(characterStore)
</script>

<template>
    <section class="flex flex-col gap-3.5">
        <div class="flex items-center justify-between">
            <TextLabel>ARMAS E FERRAMENTAS</TextLabel>

            <Button @click="openNewItemDialog">
                <PhPlus />
                <span>Adicionar item</span>
            </Button>
        </div>

        <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <CharacterItemCard
                v-for="item in itemList"
                :key="item.id"
                :name="item.name"
                :rarity="item.rarity"
                :type="item.type"
                :description="item.description"
                @remove="() => characterStore.removeItem(item)"
            />
        </div>
    </section>
</template>
