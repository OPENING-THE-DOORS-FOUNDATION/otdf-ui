<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, useId } from "vue";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";

/**
 * Label + control + hint + error, wired for screen readers.
 * The default slot receives { id, invalid, describedBy } to bind on the control:
 *
 *   <OtdfField label="First name" required :error="err">
 *     <template #default="{ id, invalid, describedBy }">
 *       <Input :id="id" :aria-invalid="invalid" :aria-describedby="describedBy" />
 *     </template>
 *   </OtdfField>
 */
const props = defineProps<{
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  /** Use a fixed id instead of a generated one. */
  id?: string;
  class?: HTMLAttributes["class"];
}>();

const generated = useId();
const controlId = computed(() => props.id ?? `otdf-field-${generated}`);
const hintId = computed(() => `${controlId.value}-hint`);
const errorId = computed(() => `${controlId.value}-error`);
const invalid = computed(() => !!props.error);
const describedBy = computed(
  () =>
    [props.hint ? hintId.value : null, props.error ? errorId.value : null]
      .filter(Boolean)
      .join(" ") || undefined,
);
</script>

<template>
  <div data-slot="otdf-field" :class="cn('grid content-start gap-1.5', props.class)">
    <Label :for="controlId" class="leading-snug text-earth">
      <span>
        {{ label }}
        <span v-if="required" class="text-terracotta" aria-hidden="true">*</span>
        <span v-if="required" class="sr-only">(required)</span>
      </span>
    </Label>
    <slot :id="controlId" :invalid="invalid" :described-by="describedBy" />
    <p v-if="hint" :id="hintId" class="text-[0.8125rem] leading-snug text-muted-foreground">
      {{ hint }}
    </p>
    <p
      v-if="error"
      :id="errorId"
      class="text-[0.8125rem] leading-snug font-medium text-destructive"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
