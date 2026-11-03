<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

const progressValue = defineModel<number>('progress', { required: true })
</script>

<template>
    <ProgressRoot
        v-model="progressValue"
        class="relative my-2.5 h-2 w-full overflow-clip rounded-full bg-t200"
    >
        <ProgressIndicator
            class="indicator relative block h-full w-full overflow-hidden rounded-full transition-transform duration-660 after:absolute after:inset-0 after:bg-t600 after:bg-size-[30px_30px] after:content-['']"
            :style="`transform: translateX(-${100 - progressValue}%)`"
        />
    </ProgressRoot>
</template>
