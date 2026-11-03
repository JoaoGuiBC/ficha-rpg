<script setup lang="ts">
import { PhCheck } from '@phosphor-icons/vue'

import { skills as baseSkills } from '~~/shared/data/skills'

const attributes = ['FOR', 'AGI', 'VIG', 'INT', 'ESP']

const { isNewSkillDialogOpen } = useDialogs()
const characterStore = useCharacterStore()

const skillSearch = ref('')
const chosenSkills = ref<string[]>([])

const skills = computed(() => {
    const search = skillSearch.value.trim().toLocaleLowerCase()
    const currentSkills = characterStore.skillList.map(s => s.name)

    const filtered = baseSkills.filter(
        skill => skill.name.includes(search) && !currentSkills.includes(skill.name),
    )

    return attributes
        .map(attr => ({
            attr,
            skills: filtered.filter(skill => skill.attr.includes(attr)),
        }))
        .filter(group => group.skills.length > 0)
})

function handleAddSkill() {
    for (const skill of chosenSkills.value) {
        characterStore.addSkill({ name: skill, level: 5 })
    }

    isNewSkillDialogOpen.value = false
}

watch(isNewSkillDialogOpen, () => {
    if (!isNewSkillDialogOpen.value) {
        skillSearch.value = ''
        chosenSkills.value = []
    }
})
</script>

<template>
    <Dialog v-model:open="isNewSkillDialogOpen" title="Adicionar perícia">
        <div>
            <Input v-model:value="skillSearch" placeholder="Buscar perícia…" name="skill-search" />

            <ListboxRoot
                v-model:model-value="chosenSkills"
                class="my-5 flex max-h-96 w-full flex-col overflow-auto"
                multiple
            >
                <ListboxContent class="flex flex-col gap-3">
                    <ListboxGroup
                        v-for="group in skills"
                        :key="group.attr"
                        class="flex flex-col gap-0.5 pr-1"
                    >
                        <ListboxGroupLabel class="text-base font-bold text-t800">
                            {{ group.attr }}
                        </ListboxGroupLabel>

                        <ListboxItem
                            v-for="skill in group.skills"
                            :key="skill.name"
                            :value="skill.name"
                            class="group flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 even:bg-t100"
                        >
                            <ListboxItemIndicator class="text-t800">
                                <PhCheck weight="bold" />
                            </ListboxItemIndicator>

                            <div class="flex w-full justify-center">
                                <span class="w-full text-base font-bold text-t900">
                                    {{ capitalizeAllWords(skill.name) }}
                                </span>
                                <span
                                    class="min-w-fit text-sm font-semibold text-t800 group-even:mr-2"
                                >
                                    {{ skill.attr.join(' / ') }}
                                </span>
                            </div>
                        </ListboxItem>
                    </ListboxGroup>
                </ListboxContent>
            </ListboxRoot>

            <div class="flex items-center justify-end gap-2.5">
                <Button variant="secondary" @click="() => (isNewSkillDialogOpen = false)">
                    Fechar
                </Button>

                <Button @click="handleAddSkill"> Adicionar </Button>
            </div>
        </div>
    </Dialog>
</template>
