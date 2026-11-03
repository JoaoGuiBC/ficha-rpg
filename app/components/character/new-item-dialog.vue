<script setup lang="ts">
import { capitalize } from 'vue'

import { itemCategories, type ItemCategory } from '~~/shared/types/item-category'
import { itemRarities, type ItemRarity } from '~~/shared/types/item-rarity'

import { itemRarityLabels } from '~/utils/item-rarity-labels'

const { isNewItemDialogOpen } = useDialogs()
const characterStore = useCharacterStore()

const itemName = ref('')
const itemDescription = ref('')
const chosenCategory = ref<ItemCategory | undefined>()
const chosenRarity = ref<ItemRarity | undefined>()

const rarityNeeded = computed(() => !!chosenCategory.value && chosenCategory.value !== 'OUTRO')
const descriptionNeeded = computed(() => !!chosenCategory.value && chosenCategory.value === 'OUTRO')

function handleAddItem() {
    if (!itemName.value || !chosenCategory.value) return
    if (rarityNeeded.value && !chosenRarity.value) return
    if (descriptionNeeded.value && !itemDescription.value) return

    characterStore.addItem({
        name: itemName.value,
        description: itemDescription.value,
        rarity: chosenRarity.value,
        type: chosenCategory.value!,
    })

    isNewItemDialogOpen.value = false
}

watch(isNewItemDialogOpen, () => {
    if (!isNewItemDialogOpen.value) {
        itemName.value = ''
        itemDescription.value = ''
        chosenCategory.value = undefined
        chosenRarity.value = undefined
    }
})
</script>

<template>
    <Dialog v-model:open="isNewItemDialogOpen" title="Adicionar item">
        <div class="mt-5">
            <Input v-model:value="itemName" label="NOME" name="item-name" />

            <ToggleGroupRoot v-model="chosenCategory" class="my-5 flex flex-col gap-1.5">
                <TextLabel>TIPO</TextLabel>

                <div class="flex flex-wrap gap-2">
                    <ToggleGroupItem
                        v-for="category in itemCategories"
                        :key="category"
                        class="cursor-pointer rounded-full bg-t100 px-3.5 py-2 text-xs font-bold text-t800 data-[state=on]:bg-t700 data-[state=on]:text-white"
                        :value="category"
                    >
                        {{ category }}
                    </ToggleGroupItem>
                </div>
            </ToggleGroupRoot>

            <ToggleGroupRoot
                v-if="rarityNeeded"
                v-model="chosenRarity"
                class="mt-5 flex flex-col gap-1.5"
            >
                <TextLabel>RARIDADE</TextLabel>

                <div class="flex flex-wrap gap-2">
                    <ToggleGroupItem
                        v-for="rarity in itemRarities"
                        :key="rarity"
                        class="cursor-pointer rounded-xl bg-t100 px-2 py-2.5 text-sm font-bold text-t800 data-[state=on]:bg-t700 data-[state=on]:text-white"
                        :value="rarity"
                    >
                        {{ capitalize(itemRarityLabels[rarity]) }}
                    </ToggleGroupItem>
                </div>
            </ToggleGroupRoot>

            <Input
                v-if="descriptionNeeded"
                v-model:value="itemDescription"
                label="DESCRIÇÃO"
                name="item-description"
            />

            <div class="mt-5 flex items-center justify-end gap-2.5">
                <Button variant="secondary" @click="() => (isNewItemDialogOpen = false)">
                    Fechar
                </Button>

                <Button @click="handleAddItem"> Adicionar </Button>
            </div>
        </div>
    </Dialog>
</template>
