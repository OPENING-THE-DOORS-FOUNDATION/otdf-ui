<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { CircleAlertIcon, InfoIcon, TriangleAlertIcon } from "@lucide/vue";
import { computed } from "vue";
import { cn } from "../../lib/utils";

/**
 * Inline message box. "info" replaces the old ochre `v-alert text` notes.
 */
const props = withDefaults(
  defineProps<{
    tone?: "info" | "warning" | "error";
    title?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { tone: "info" },
);

const toneClass = computed(
  () =>
    ({
      info: "border-ochre/50 bg-accent/70 text-accent-foreground",
      warning: "border-warning/50 bg-warning/10 text-earth",
      error: "border-destructive/40 bg-destructive/5 text-destructive",
    })[props.tone],
);
const icon = computed(
  () => ({ info: InfoIcon, warning: TriangleAlertIcon, error: CircleAlertIcon })[props.tone],
);
</script>

<template>
  <div
    :role="tone === 'error' ? 'alert' : 'note'"
    :class="
      cn(
        'flex gap-3 rounded-lg border-l-4 border px-4 py-3 text-sm leading-relaxed',
        toneClass,
        props.class,
      )
    "
  >
    <component :is="icon" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
    <div class="min-w-0 space-y-1">
      <p v-if="title" class="font-semibold">{{ title }}</p>
      <slot />
    </div>
  </div>
</template>
