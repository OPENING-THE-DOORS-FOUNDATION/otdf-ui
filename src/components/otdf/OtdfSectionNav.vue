<script setup lang="ts">
import { CheckIcon } from "@lucide/vue";
import type { OtdfNavItem } from "../../lib/options";
import { cn } from "../../lib/utils";

/** Vertical list of in-page sections with optional completion ticks. */
defineProps<{
  items: readonly OtdfNavItem[];
  activeId?: string;
  /** "sidebar" for the terracotta rail, "plain" for sheets and light backgrounds. */
  variant?: "sidebar" | "plain";
}>();
const emit = defineEmits<{ navigate: [id: string] }>();
</script>

<template>
  <nav aria-label="Application sections">
    <ol class="grid gap-1">
      <li v-for="(item, index) in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          :aria-current="item.id === activeId ? 'location' : undefined"
          :class="
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-3',
              variant === 'plain'
                ? 'text-earth hover:bg-accent focus-visible:ring-ring/50 aria-[current=location]:bg-accent aria-[current=location]:font-semibold'
                : 'text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-white focus-visible:ring-sidebar-ring aria-[current=location]:bg-sidebar-accent aria-[current=location]:font-semibold aria-[current=location]:text-white',
            )
          "
          @click.prevent="emit('navigate', item.id)"
        >
          <span
            :class="
              cn(
                'grid size-6 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums',
                variant === 'plain' ? 'border-ochre text-terracotta' : 'border-white/45',
                item.complete &&
                  (variant === 'plain'
                    ? 'border-eucalyptus bg-eucalyptus text-white'
                    : 'border-white bg-white text-terracotta'),
              )
            "
            aria-hidden="true"
          >
            <CheckIcon v-if="item.complete" class="size-3.5" />
            <template v-else>{{ index + 1 }}</template>
          </span>
          <span class="min-w-0 flex-1 truncate">{{ item.title }}</span>
          <span v-if="item.complete" class="sr-only">(complete)</span>
        </a>
      </li>
    </ol>
  </nav>
</template>
