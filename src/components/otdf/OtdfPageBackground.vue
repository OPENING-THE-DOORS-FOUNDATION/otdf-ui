<script setup lang="ts">
import dotPainting from "../../assets/dot-painting.png";

/**
 * Fixed dot-painting artwork behind the page, faded like the original
 * (opacity 0.3 over a white page). Purely decorative.
 */
withDefaults(defineProps<{ opacity?: number }>(), { opacity: 0.18 });
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 -z-10 bg-center bg-no-repeat [background-size:min(1550px,140vw)_auto]"
    :style="{ backgroundImage: `url(${dotPainting})`, opacity }"
  />
</template>
