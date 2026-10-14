<script setup lang="ts">
/** "Returning student": a grown tree at the end of a dotted path, the sun beside it. */
withDefaults(defineProps<{ label?: string }>(), {
  label: "A grown tree at the end of a dotted path, with the sun beside it",
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
    <circle cx="146" cy="60" r="11" fill="#e7a94a" />
    <circle
      cx="146"
      cy="60"
      r="19"
      fill="none"
      stroke="#e7a94a"
      stroke-width="3"
      stroke-linecap="round"
      stroke-dasharray="0 7.46"
    />
    <ellipse cx="104" cy="148" rx="50" ry="12" fill="#bd5d38" />
    <path
      d="M34 166 C58 160 74 152 96 148"
      fill="none"
      stroke="#93432a"
      stroke-width="5"
      stroke-linecap="round"
      stroke-dasharray="0 10"
    />
    <path d="M97 148 L101 104 L109 104 L113 148 Z" fill="#93432a" />
    <path
      d="M104 118 L88 100 M106 112 L122 96"
      stroke="#93432a"
      stroke-width="4"
      stroke-linecap="round"
    />
    <circle cx="84" cy="90" r="22" fill="#4f7552" />
    <circle cx="122" cy="86" r="23" fill="#5f8a62" />
    <circle cx="102" cy="66" r="22" fill="#6f9a71" />
    <g fill="#faf5ef">
      <circle cx="80" cy="88" r="2.4" />
      <circle cx="90" cy="96" r="2.4" />
      <circle cx="96" cy="62" r="2.4" />
      <circle cx="108" cy="70" r="2.4" />
      <circle cx="120" cy="80" r="2.4" />
      <circle cx="128" cy="92" r="2.4" />
      <circle cx="102" cy="58" r="2.4" />
    </g>
  </svg>
</template>
