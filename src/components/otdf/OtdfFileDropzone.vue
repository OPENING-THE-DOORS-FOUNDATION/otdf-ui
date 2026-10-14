<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { UploadCloudIcon } from "@lucide/vue";
import { computed, ref } from "vue";
import { formatBytes } from "../../lib/options";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

/**
 * Drop zone + file picker. It only checks type, size and count; the parent
 * owns the file list. Files that fail are reported through `reject` with a
 * sentence per file, ready to show to the user.
 */
const props = withDefaults(
  defineProps<{
    /** MIME types, e.g. ["application/pdf", "image/png"]. */
    accept: readonly string[];
    multiple?: boolean;
    /** Bytes. */
    maxSize?: number;
    /** Total files allowed, counting `currentCount`. */
    maxFiles?: number;
    currentCount?: number;
    /** Files already chosen, used to skip exact duplicates. */
    existing?: readonly File[];
    label?: string;
    hint?: string;
    id?: string;
    invalid?: boolean;
    describedBy?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    maxFiles: Number.POSITIVE_INFINITY,
    currentCount: 0,
    existing: () => [],
    label: "Choose a file or drag it here",
  },
);

const emit = defineEmits<{
  add: [files: File[]];
  reject: [messages: string[]];
}>();

const dragging = ref(false);
const full = computed(() => props.currentCount >= props.maxFiles);
const typeLabel = computed(() =>
  props.accept
    .map((t) => ({ "application/pdf": "PDF", "image/png": "PNG", "image/jpeg": "JPG" })[t] ?? t)
    .join(", "),
);

function take(list: FileList | null | undefined) {
  if (!list?.length || props.disabled) return;
  const picked = props.multiple ? Array.from(list) : [list[0]!];
  const accepted: File[] = [];
  const rejected: string[] = [];
  for (const file of picked) {
    if (!props.accept.includes(file.type)) {
      rejected.push(`${file.name}: only ${typeLabel.value} files are accepted`);
    } else if (file.size > props.maxSize) {
      rejected.push(
        `${file.name}: ${formatBytes(file.size)}, larger than ${formatBytes(props.maxSize)}`,
      );
    } else if (props.existing.some((f) => f.name === file.name && f.size === file.size)) {
      // same file picked twice, skip quietly
    } else if (props.currentCount + accepted.length >= props.maxFiles) {
      rejected.push(`${file.name}: the limit of ${props.maxFiles} files is reached`);
    } else {
      accepted.push(file);
    }
  }
  if (accepted.length) emit("add", accepted);
  emit("reject", rejected);
}

function onPick(event: Event) {
  const target = event.target as HTMLInputElement;
  take(target.files);
  // clear so picking the same file again still fires change
  target.value = "";
}

function onDrop(event: DragEvent) {
  dragging.value = false;
  take(event.dataTransfer?.files);
}
</script>

<template>
  <div
    :class="
      cn(
        'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors',
        dragging ? 'border-terracotta bg-accent' : 'border-ochre/60 bg-card hover:bg-accent/40',
        invalid && 'border-destructive',
        (disabled || full) && 'pointer-events-none opacity-60',
        props.class,
      )
    "
    @dragover.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @drop.prevent="onDrop"
  >
    <UploadCloudIcon class="size-8 text-terracotta" aria-hidden="true" />
    <Label :for="id" class="cursor-pointer text-base font-medium text-earth">
      <span class="underline decoration-ochre underline-offset-4">{{ label }}</span>
    </Label>
    <p v-if="hint" class="text-xs text-muted-foreground">{{ hint }}</p>
    <Input
      :id="id"
      type="file"
      class="sr-only"
      :accept="accept.join(',')"
      :multiple="multiple"
      :disabled="disabled || full"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      @change="onPick"
    />
  </div>
</template>
