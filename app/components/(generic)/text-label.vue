<script setup lang="ts">
defineProps({ color: { default: 'text-t800', type: String } })
</script>

<template>
    <strong :class="color" class="text-xs font-bold tracking-widest">
        <slot />
    </strong>
</template>
