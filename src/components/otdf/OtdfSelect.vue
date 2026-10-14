<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import type { OtdfOptionInput } from "../../lib/options";
import { normalizeOptions } from "../../lib/options";
import { cn } from "../../lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

/**
 * Single choice from a short fixed list (YES/NO, gender, state...).
 * The model is a string; "" means nothing chosen, matching what the
 * application payload has always sent for an untouched select.
 */
const props = withDefaults(
  defineProps<{
    options: readonly OtdfOptionInput[];
    placeholder?: string;
    id?: string;
    invalid?: boolean;
    describedBy?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  { placeholder: "Select…" },
);

const model = defineModel<string | null>({ default: "" });
const items = computed(() => normalizeOptions(props.options));
const selected = computed({
  get: () => (model.value ? model.value : undefined),
  set: (v) => {
    model.value = v ?? "";
  },
});
</script>

<template>
  <Select v-model="selected" :disabled="disabled">
    <SelectTrigger
      :id="id"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      :class="cn('h-11 w-full bg-card text-base data-[size=default]:h-11 sm:text-sm', props.class)"
    >
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent position="popper" class="max-h-80">
      <SelectItem v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
