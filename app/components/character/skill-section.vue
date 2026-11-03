<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

const { openNewSkillDialog } = useDialogs()

const characterStore = useCharacterStore()
const { skillList } = storeToRefs(characterStore)
</script>

<template>
    <section class="flex flex-col gap-3.5">
        <div class="flex items-center justify-between">
            <TextLabel>PERÍCIAS</TextLabel>

            <Button @click="openNewSkillDialog">
                <PhPlus />
                <span>Adicionar perícia</span>
            </Button>
        </div>

        <div class="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <CharacterSkillCard
                v-for="(skill, index) in skillList"
                :key="skill.id"
                v-model:skill="skillList[index]!"
            />
        </div>
    </section>
</template>
