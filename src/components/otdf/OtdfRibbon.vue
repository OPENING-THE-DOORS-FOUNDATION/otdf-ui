<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../lib/utils";

/**
 * Sub-section heading that hangs off the left edge of its OtdfSegment, with a
 * folded tail underneath, as on the original apply page. The text sits on
 * terracotta (4.6:1 with white) instead of the old light clay (2.3:1).
 */
const props = withDefaults(
  defineProps<{
    title?: string;
    /** Heading level for the document outline. */
    as?: "h2" | "h3" | "h4";
    class?: HTMLAttributes["class"];
  }>(),
  { as: "h3" },
);
</script>

<template>
  <div :class="cn('relative mb-5 -ml-8 sm:-ml-[3.25rem]', props.class)">
    <component
      :is="as"
      class="relative inline-flex max-w-[calc(100%-1rem)] items-center gap-3 rounded-r-md rounded-tl-md bg-terracotta py-1.5 pr-6 pl-8 font-sans text-lg font-bold text-white shadow-sm sm:pl-4"
    >
      <span aria-hidden="true" class="otdf-dots hidden h-2 w-6 text-white/55 sm:block" />
      <slot>{{ title }}</slot>
    </component>
    <!-- folded tail -->
    <span
      aria-hidden="true"
      class="absolute top-full left-0 h-0 w-0 border-t-[10px] border-l-[12px] border-t-terracotta-deep border-l-transparent"
    />
  </div>
</template>
