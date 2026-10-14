<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

/** Large clickable card with an illustration, used for "new / returning". */
const props = defineProps<{
  image?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  selected?: boolean;
  class?: HTMLAttributes["class"];
}>();
defineEmits<{ choose: [] }>();
</script>

<template>
  <Button
    type="button"
    variant="outline"
    :aria-pressed="selected"
    :class="
      cn(
        'group flex h-full w-full flex-col items-center gap-4 rounded-2xl border-2 bg-card px-6 py-8 text-center font-normal whitespace-normal transition-all outline-none hover:bg-card',
        'border-border hover:-translate-y-0.5 hover:border-ochre hover:shadow-[0_12px_24px_-12px_rgb(189_93_56/0.45)]',
        'focus-visible:border-terracotta focus-visible:ring-4 focus-visible:ring-ring/40',
        selected && 'border-terracotta bg-accent',
        props.class,
      )
    "
    @click="$emit('choose')"
  >
    <!-- full illustration (it brings its own round backdrop) -->
    <span
      v-if="$slots.art"
      class="block size-40 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none sm:size-44"
    >
      <slot name="art" />
    </span>
    <!-- small image or icon on a tinted disc -->
    <span
      v-else
      class="grid size-24 place-items-center rounded-full bg-accent transition-colors group-hover:bg-ochre/25"
    >
      <img v-if="image" :src="image" :alt="imageAlt ?? ''" class="size-16" />
      <slot name="icon" />
    </span>
    <span class="font-heading text-xl font-extrabold text-earth">{{ title }}</span>
    <span v-if="description" class="max-w-xs text-sm leading-relaxed text-muted-foreground">
      {{ description }}
    </span>
  </Button>
</template>
