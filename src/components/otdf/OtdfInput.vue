<script setup lang="ts">
import type { HTMLAttributes, InputTypeHTMLAttribute } from "vue";
import { cn } from "../../lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "../ui/input-group";

/**
 * Text input sized for form-filling on phones (44px tall, 16px text so iOS
 * does not zoom), built on shadcn InputGroup. The model is always a string,
 * like the old Vuetify fields, so amounts reach the backend in the same shape.
 */
const props = withDefaults(
  defineProps<{
    type?: InputTypeHTMLAttribute;
    id?: string;
    invalid?: boolean;
    describedBy?: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    maxlength?: number;
    min?: string;
    max?: string;
    inputmode?: HTMLAttributes["inputmode"];
    autocomplete?: string;
    /** Text shown inside the field before the value, e.g. "$". */
    prefix?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { type: "text" },
);

const model = defineModel<string | null>({ default: "" });
</script>

<template>
  <InputGroup
    :class="cn('h-11 bg-card', readonly && 'bg-muted/60', disabled && 'opacity-50', props.class)"
  >
    <InputGroupAddon v-if="prefix" aria-hidden="true">
      <InputGroupText>{{ prefix }}</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput
      :id="id"
      :type="type"
      :model-value="model ?? ''"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      class="h-full text-base sm:text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      @update:model-value="model = String($event)"
    />
  </InputGroup>
</template>
