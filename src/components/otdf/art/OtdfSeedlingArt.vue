<script setup lang="ts">
/** "New student": a seedling growing inside a ring of painted dots. */
withDefaults(defineProps<{ label?: string }>(), {
  label: "A seedling growing inside a ring of painted dots",
});
</script>

<template>
  <svg viewBox="0 0 200 200" role="img" :aria-label="label">
    <circle cx="100" cy="100" r="94" fill="#f8e7dd" />
    <circle
      cx="100"
      cy="100"
      r="82"
      fill="none"
      stroke="#d48a6e"
      stroke-width="6"
      stroke-linecap="round"
      stroke-dasharray="0 12.88"
    />
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke="#de987f"
      stroke-width="3.4"
      stroke-linecap="round"
      stroke-dasharray="0 10.99"
    />
    <ellipse cx="100" cy="146" rx="52" ry="13" fill="#bd5d38" />
    <line
      x1="62"
      y1="146"
      x2="138"
      y2="146"
      stroke="#faf5ef"
      stroke-width="3"
      stroke-linecap="round"
      stroke-dasharray="0 9.5"
    />
    <path
      d="M100 140 C100 124 98 108 100 86"
      fill="none"
      stroke="#4f7552"
      stroke-width="5"
      stroke-linecap="round"
    />
    <path d="M99 110 C82 109 70 97 67 80 C84 82 96 93 99 110 Z" fill="#4f7552" />
    <path d="M100 96 C117 94 130 82 134 64 C116 66 103 77 100 96 Z" fill="#6f9a71" />
    <circle cx="64" cy="118" r="3" fill="#de987f" />
    <circle cx="140" cy="108" r="3" fill="#de987f" />
    <circle cx="122" cy="124" r="2.4" fill="#d48a6e" />
    <circle cx="76" cy="62" r="2.4" fill="#d48a6e" />
  </svg>
</template>
