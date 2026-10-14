<script setup lang="ts">
import { FileImageIcon, FileTextIcon, XIcon } from "@lucide/vue";
import { formatBytes } from "../../lib/options";
import { Button } from "../ui/button";

/** Picked files with a preview link and a remove button. */
defineProps<{ files: readonly File[] }>();
const emit = defineEmits<{ remove: [index: number] }>();

function preview(file: File) {
  const url = URL.createObjectURL(file);
  window.open(url, "_blank", "noopener");
  // give the new tab time to load before releasing the blob
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
</script>

<template>
  <ul
    v-if="files.length"
    class="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card"
  >
    <li
      v-for="(file, index) in files"
      :key="`${file.name}-${file.size}-${index}`"
      class="flex items-center gap-3 px-3 py-2.5"
    >
      <component
        :is="file.type === 'application/pdf' ? FileTextIcon : FileImageIcon"
        class="size-5 shrink-0 text-terracotta"
        aria-hidden="true"
      />
      <div class="min-w-0 flex-1">
        <Button
          type="button"
          variant="link"
          class="block h-auto max-w-full truncate p-0 text-left text-sm font-medium text-earth underline decoration-ochre/60 underline-offset-2 hover:decoration-terracotta"
          title="Open to check this file"
          @click="preview(file)"
        >
          {{ file.name }}
        </Button>
        <p class="text-xs text-muted-foreground">{{ formatBytes(file.size) }}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        class="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        :aria-label="`Remove ${file.name}`"
        @click="emit('remove', index)"
      >
        <XIcon />
      </Button>
    </li>
  </ul>
</template>
