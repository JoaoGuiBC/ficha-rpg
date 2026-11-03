<script setup lang="ts">
import { PhCaretDown, PhCheck, PhWarningCircle } from '@phosphor-icons/vue'
import {
    SelectContent,
    SelectIcon,
    SelectItem,
    SelectItemIndicator,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'reka-ui'

const currentValue = defineModel('currentValue', { type: String })

const props = defineProps<{ options: string[]; label: string; isErrored: boolean; tint?: string }>()

const errorMessage = computed(() => `${props.label} é obrigatório`)
</script>

<template>
    <SelectRoot v-model="currentValue">
        <div>
            <div class="z-30 mb-1 flex justify-between">
                <TextLabel>{{ label }}</TextLabel>

                <span
                    v-if="isErrored"
                    class="z-30 flex items-center justify-center gap-1 text-xs font-bold text-rose-700"
                >
                    <PhWarningCircle weight="bold" />
                    <span>{{ errorMessage }}</span>
                </span>
            </div>

            <SelectTrigger
                class="group z-30 flex w-full items-center justify-between rounded-xl border border-t300 bg-t100 p-3.5 text-sm text-t900 focus:outline-2 focus:outline-offset-2 focus:outline-t500"
            >
                <SelectValue class="z-30 text-sm text-t900" />
                <SelectIcon
                    class="z-30 rotate-0 transition-transform group-data-[state=open]:rotate-180"
                >
                    <PhCaretDown />
                </SelectIcon>
            </SelectTrigger>
        </div>

        <SelectPortal>
            <SelectContent
                align="center"
                position="popper"
                :data-tint="props.tint"
                class="z-30 w-64 rounded-xl border border-t200 bg-white p-2 shadow-xl shadow-zinc-500/50"
            >
                <SelectScrollUpButton />

                <SelectViewport class="z-30 flex flex-col gap-0.5">
                    <SelectItem
                        v-for="option in props.options"
                        :key="option"
                        :value="option"
                        class="z-30 flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-t900 hover:bg-t100"
                    >
                        <SelectItemText
                            :data-selected="currentValue === option"
                            class="z-30 text-sm data-[selected=true]:font-semibold"
                        >
                            {{ option }}
                        </SelectItemText>

                        <SelectItemIndicator>
                            <PhCheck weight="bold" />
                        </SelectItemIndicator>
                    </SelectItem>
                </SelectViewport>
                <SelectScrollDownButton />
                <SelectArrow />
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>
