<script setup lang="ts">
import { PhWarningCircle } from '@phosphor-icons/vue'

type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

const {
    name,
    label,
    placeholder,
    type = 'text',
} = defineProps<{
    name: string
    label?: string
    placeholder?: string
    type?: InputType
}>()

const value = defineModel<string>('value', {
    default: '',
})
</script>

<template>
    <FieldRoot :name="name" class="flex w-full flex-col gap-1">
        <div class="flex w-full items-center justify-between">
            <FieldLabel v-if="label" as-child>
                <TextLabel>{{ label }}</TextLabel>
            </FieldLabel>

            <FieldError
                v-slot="{ errors }"
                class="flex items-center justify-center gap-1 text-xs font-bold text-rose-700"
            >
                <PhWarningCircle weight="bold" />
                <span>{{ errors[0] }}</span>
            </FieldError>
        </div>

        <FieldControl
            v-model="value"
            :type="type"
            :placeholder="placeholder"
            class="w-full rounded-xl border border-t300 bg-t100 p-3.5 text-sm text-t900 focus:outline-2 focus:outline-offset-2 focus:outline-t500"
        />
    </FieldRoot>
</template>
