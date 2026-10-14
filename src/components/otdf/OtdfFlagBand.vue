<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../lib/utils";

/** Thin black / red / yellow band, echoing the OTDF logo. Decorative. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div aria-hidden="true" :class="cn('otdf-flag-band h-1.5 w-full', props.class)" />
</template>
