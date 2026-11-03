<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue'
import { capitalize } from 'vue'

import { skills } from '~~/shared/data/skills'

const characterStore = useCharacterStore()

type Skill = { id: string; name: string; level: number }

const skill = defineModel<Skill>('skill', { required: true })

const skillData = computed(() => {
    const filter = skills.find(s => s.name === skill.value.name)
    return { attrs: filter?.attr ?? [], description: filter?.description ?? '' }
})

function handleDelete() {
    characterStore.removeSkill(skill.value.id)
}
</script>

<template>
    <div class="flex justify-between gap-3.5 rounded-2xl border border-t200 bg-white p-4">
        <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-2">
                <strong class="text-base font-bold text-t900">{{ capitalize(skill.name) }}</strong>
                <Badge v-for="attr in skillData.attrs" :key="attr">{{ attr }}</Badge>
            </div>

            <p class="text-sm/normal text-t800">{{ skillData.description }}</p>
        </div>

        <div class="flex flex-col items-end gap-2">
            <CharacterSkillLevel v-model:bonus="skill.level" :skill-name="skill.name" />

            <button
                type="button"
                class="cursor-pointer rounded-md p-1.5 text-t700 hover:bg-t100"
                @click="handleDelete"
            >
                <PhTrash weight="bold" class="size-4" />
            </button>
        </div>
    </div>
</template>
