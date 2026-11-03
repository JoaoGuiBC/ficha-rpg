<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue'

interface Status {
    pv: number
    pm: number
    def: number
}

const props = defineProps<{
    id: string
    name: string
    description: string
    tint: string
    origin: string
    status: Status
}>()

const { openDeletionDialog } = useDialogs()

const linkAddress = computed(() => `/personagem/${props.id}`)
</script>

<template>
    <NuxtLink
        :to="linkAddress"
        class="col-span-1 flex w-full cursor-pointer flex-col gap-4 rounded-2xl border border-t200 bg-white p-5 shadow-xl shadow-transparent transition-shadow hover:shadow-t300/25"
    >
        <div class="mb-auto flex items-center justify-between">
            <CharacterInfo :tint="tint" :name="name" :description="description" />

            <button
                type="button"
                class="flex size-9 cursor-pointer items-center justify-center rounded-lg hover:bg-t200"
                @click.stop.prevent="
                    () =>
                        openDeletionDialog(
                            `Exluir ${name}?`,
                            'A ficha inteira será removida. Essa ação não pode ser desfeita.',
                            `/api/character/${id}`,
                        )
                "
            >
                <PhTrash class="size-5 text-t500" />
            </button>
        </div>

        <div class="flex items-center justify-center gap-2">
            <div class="flex flex-1 flex-col justify-center rounded-xl bg-t100 p-3">
                <TextLabel class="text-xs/tight tracking-wider text-t600">PV</TextLabel>
                <span class="font-title text-xl/tight font-bold text-t900">
                    {{ status.pv }}
                </span>
            </div>

            <div class="flex flex-1 flex-col justify-center rounded-xl bg-t100 p-3">
                <TextLabel class="text-xs/tight tracking-wider text-t600">PM</TextLabel>
                <span class="font-title text-xl/tight font-bold text-t900">
                    {{ status.pm }}
                </span>
            </div>

            <div class="flex flex-1 flex-col justify-center rounded-xl bg-t100 p-3">
                <TextLabel class="text-xs/tight tracking-wider text-t600">DEF</TextLabel>
                <span class="font-title text-xl/tight font-bold text-t900">
                    {{ status.def }}
                </span>
            </div>
        </div>

        <div class="flex items-center gap-1">
            <div :data-tint="tint" aria-hidden class="size-2.5 rounded-full bg-t500" />
            <span class="text-sm text-t600">{{ origin }}</span>
        </div>
    </NuxtLink>
</template>
