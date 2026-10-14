<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../lib/utils";

/**
 * A page section card. The original apply page drew every section as a
 * slightly translucent card with a 2px ochre border over the dot painting.
 */
const props = defineProps<{
  /** Large centred heading, used for page-level sections (Home, Contact). */
  title?: string;
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <section
    data-slot="otdf-segment"
    :class="
      cn(
        'relative mx-auto w-full max-w-5xl scroll-mt-24 rounded-2xl border-2 border-ochre bg-card/95 px-5 py-6 shadow-[0_1px_0_rgb(189_93_56/0.08),0_12px_32px_-18px_rgb(51_37_30/0.35)] backdrop-blur-[1px] sm:px-10 sm:py-8',
        props.class,
      )
    "
  >
    <header v-if="title || $slots.title" class="mb-6 text-center">
      <h2 class="text-2xl font-extrabold tracking-tight text-earth sm:text-3xl">
        <slot name="title">{{ title }}</slot>
      </h2>
      <div aria-hidden="true" class="otdf-dots mx-auto mt-3 h-2 w-24 text-ochre" />
    </header>
    <slot />
  </section>
</template>
