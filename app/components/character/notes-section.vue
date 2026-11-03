<script setup lang="ts">
const { character } = storeToRefs(useCharacterStore())
</script>

<template>
    <section class="flex flex-col gap-3.5">
        <TextLabel>NOTAS</TextLabel>

        <div class="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            <Textarea
                v-model:value="character.notes1"
                name="notes-1"
                label="NOTAS 1"
                placeholder="Anotações da sessão, pistas, nomes..."
            />
            <Textarea
                v-model:value="character.notes2"
                name="notes-2"
                label="NOTAS 2"
                placeholder="Anotações da sessão, pistas, nomes..."
            />
        </div>
    </section>
</template>
