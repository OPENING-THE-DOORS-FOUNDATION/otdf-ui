<script setup lang="ts">
/**
 * Full-page message: round closed, server unreachable, loading.
 * Slots: `visual` (illustration), default (body text), `actions` (cards, buttons).
 */
defineProps<{
  image?: string;
  imageAlt?: string;
  title: string;
}>();
</script>

<template>
  <div
    class="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-4 py-10 text-center"
  >
    <img
      v-if="image"
      :src="image"
      :alt="imageAlt ?? ''"
      class="mb-6 h-56 w-auto max-w-full object-contain"
    />
    <slot name="visual" />
    <h1 class="text-3xl font-extrabold tracking-tight text-balance text-earth sm:text-4xl">
      {{ title }}
    </h1>
    <div aria-hidden="true" class="otdf-dots mx-auto mt-3 mb-5 h-2 w-24 text-ochre" />
    <div class="max-w-xl space-y-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
      <slot />
    </div>
    <div v-if="$slots.actions" class="mt-8 w-full">
      <slot name="actions" />
    </div>
  </div>
</template>
