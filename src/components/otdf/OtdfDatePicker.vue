<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { CalendarIcon } from "@lucide/vue";
import { parseDate, type DateValue } from "@internationalized/date";
import { computed, ref } from "vue";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

/**
 * Date picker: shadcn Button + Popover + Calendar with month/year menus, so a
 * date of birth is a few taps away. The model is an ISO date string
 * ("2014-05-02", "" when empty), the format the old date field produced.
 */
const props = withDefaults(
  defineProps<{
    id?: string;
    invalid?: boolean;
    describedBy?: string;
    placeholder?: string;
    /** Earliest selectable date, yyyy-mm-dd. */
    min?: string;
    /** Latest selectable date, yyyy-mm-dd. */
    max?: string;
    /** Month to show when nothing is picked yet, yyyy-mm-dd. */
    defaultView?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  { placeholder: "Pick a date" },
);

const model = defineModel<string | null>({ default: "" });
const open = ref(false);

function parse(iso: string | null | undefined): DateValue | undefined {
  if (!iso) return undefined;
  try {
    return parseDate(iso);
  } catch {
    return undefined;
  }
}

const value = computed<DateValue | undefined>({
  get: () => parse(model.value),
  set: (v) => {
    model.value = v ? v.toString() : "";
    if (v) open.value = false;
  },
});
const minValue = computed(() => parse(props.min));
const maxValue = computed(() => parse(props.max));
const defaultPlaceholder = computed(() => parse(props.defaultView) ?? maxValue.value);

const display = computed(() => {
  const v = value.value;
  if (!v) return "";
  return new Date(v.year, v.month - 1, v.day).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        :id="id"
        type="button"
        variant="outline"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        :class="
          cn(
            'h-11 w-full justify-between bg-card px-3 text-base font-normal hover:bg-card sm:text-sm',
            !display && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <span class="truncate">{{ display || placeholder }}</span>
        <CalendarIcon class="text-muted-foreground" />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="w-auto p-0">
      <Calendar
        v-model="value"
        layout="month-and-year"
        locale="en-AU"
        :min-value="minValue"
        :max-value="maxValue"
        :default-placeholder="defaultPlaceholder"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
