<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

const { openNewCharacterDialog } = useDialogs()
</script>

<template>
    <header class="flex w-full items-end justify-between">
        <div class="flex flex-col text-t900">
            <TextLabel>O CANTICO ETERNO</TextLabel>
            <h1 class="mb-2 font-title text-5xl font-bold">Personagens</h1>
            <span class="text-base">Escolha uma ficha para abrir.</span>
        </div>

        <Button variant="primary" @click="openNewCharacterDialog">
            <PhPlus weight="bold" />

            <span>Novo personagem</span>
        </Button>
    </header>
</template>
