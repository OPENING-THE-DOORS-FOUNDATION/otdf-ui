<script setup lang="ts" generic="T = unknown">
import type { HTMLAttributes } from "vue";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "@lucide/vue";
import { computed, ref, watch } from "vue";
import type { OtdfOption, OtdfOptionInput } from "../../lib/options";
import { normalizeOptions, searchOptions } from "../../lib/options";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from "../ui/combobox";

/**
 * Searchable picker for long lists (schools, suppliers, suburbs) and for
 * remote lookups (address search), built on the shadcn Combobox.
 *
 * - Local mode: filters `options` itself (the Combobox's own filter is off)
 *   and renders at most `limit` rows, so a few thousand suburbs stay fast.
 * - `remote`: shows `options` as given and emits `update:query` so the parent
 *   can fetch results.
 * - `allowCustom`: the typed text can be used as the value when it is not in
 *   the list (suppliers and suburbs accepted free text on the old page). It is
 *   listed after the real matches, so Enter picks the best match first.
 */
const props = withDefaults(
  defineProps<{
    options: readonly OtdfOptionInput<T>[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    allowCustom?: boolean;
    remote?: boolean;
    loading?: boolean;
    limit?: number;
    id?: string;
    invalid?: boolean;
    describedBy?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    placeholder: "Select…",
    searchPlaceholder: "Type to search",
    emptyText: "No match found",
    limit: 50,
  },
);

const emit = defineEmits<{
  /** The chosen option (or a synthetic one for custom text). */
  select: [option: OtdfOption<T>];
  "update:query": [query: string];
}>();

const model = defineModel<string | null>({ default: "" });
const open = ref(false);
const query = ref("");
// the search box may be cleared before the selection lands; keep what was typed
const lastTyped = ref("");

const CUSTOM = "\u0000custom";
const all = computed(() => normalizeOptions(props.options));
const result = computed(() =>
  props.remote
    ? { items: all.value.slice(0, props.limit), truncated: false }
    : searchOptions(all.value, query.value, props.limit),
);
const displayText = computed(
  () => all.value.find((o) => o.value === model.value)?.label ?? model.value ?? "",
);
const trimmed = computed(() => query.value.trim());
const showCustom = computed(
  () =>
    props.allowCustom &&
    trimmed.value.length > 0 &&
    !all.value.some((o) => o.label.toLowerCase() === trimmed.value.toLowerCase()),
);

watch(query, (q) => {
  if (q.trim()) lastTyped.value = q.trim();
  emit("update:query", q);
});
watch(open, (isOpen) => {
  if (!isOpen) query.value = "";
});

const selected = computed({
  get: () => model.value || undefined,
  set: (value: unknown) => {
    if (typeof value !== "string") return;
    if (value === CUSTOM) {
      const text = trimmed.value || lastTyped.value;
      if (!text) return;
      model.value = text;
      emit("select", { value: text, label: text });
    } else {
      const option = all.value.find((o) => o.value === value);
      if (!option) return;
      model.value = option.value;
      emit("select", option);
    }
    open.value = false;
  },
});
</script>

<template>
  <Combobox
    v-model="selected"
    v-model:open="open"
    ignore-filter
    :reset-search-term-on-blur="false"
    :disabled="disabled"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :id="id"
          type="button"
          variant="outline"
          :aria-invalid="invalid || undefined"
          :aria-describedby="describedBy"
          :class="
            cn(
              'h-11 w-full min-w-0 justify-between bg-card px-3 text-left text-base font-normal hover:bg-card sm:text-sm',
              !displayText && 'text-muted-foreground',
              props.class,
            )
          "
        >
          <span class="truncate">{{ displayText || placeholder }}</span>
          <ChevronsUpDownIcon class="shrink-0 text-muted-foreground" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList align="start" class="max-h-96 min-w-72">
      <ComboboxInput
        v-model="query"
        :placeholder="searchPlaceholder"
        auto-focus
        class="text-base sm:text-sm"
      />
      <ComboboxViewport class="max-h-72">
        <ComboboxItem
          v-for="item in result.items"
          :key="item.value"
          :value="item.value"
          class="items-start py-2"
        >
          <span class="grid min-w-0">
            <span class="truncate">{{ item.label }}</span>
            <span v-if="item.description" class="truncate text-xs text-muted-foreground">
              {{ item.description }}
            </span>
          </span>
          <ComboboxItemIndicator class="top-2.5">
            <CheckIcon class="text-terracotta" />
          </ComboboxItemIndicator>
        </ComboboxItem>
        <ComboboxItem v-if="showCustom" :value="CUSTOM" class="py-2">
          <PlusIcon class="text-terracotta" />
          <span>
            Use “<span class="font-medium">{{ trimmed }}</span
            >”
          </span>
        </ComboboxItem>
        <p v-if="loading" class="px-2 py-3 text-center text-sm text-muted-foreground">Searching…</p>
        <p v-if="result.truncated" class="px-2 pt-1 pb-2 text-xs text-muted-foreground">
          Showing the first {{ limit }} matches. Keep typing to narrow the list.
        </p>
      </ComboboxViewport>
      <ComboboxEmpty v-if="!loading" class="py-6">
        {{ remote && !query ? searchPlaceholder : emptyText }}
      </ComboboxEmpty>
    </ComboboxList>
  </Combobox>
</template>
