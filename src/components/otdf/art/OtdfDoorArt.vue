<script setup lang="ts">
import { computed, useId } from "vue";

/**
 * The OTDF door. "closed": shut with a sign, the dotted sun rising behind it
 * (round closed). "ajar": open a little with light and dots coming through
 * (server unreachable).
 */
const props = withDefaults(
  defineProps<{
    variant?: "closed" | "ajar";
    /** Text on the hanging sign (closed only). Keep it to ~10 characters. */
    sign?: string;
    label?: string;
  }>(),
  { variant: "closed", sign: "BACK SOON" },
);

// Rings are drawn as a rising sun: clip them at the ground line so the art
// sits on any background (a cover-up rect showed as a box over the dot painting).
const clipId = `otdf-door-sky-${useId()}`;

const ariaLabel = computed(
  () =>
    props.label ??
    (props.variant === "closed"
      ? `A closed door with a ${props.sign.toLowerCase()} sign, the sun rising behind it`
      : "A door standing slightly open, with warm light and dots coming through"),
);
</script>

<template>
  <svg viewBox="0 0 360 260" role="img" :aria-label="ariaLabel">
    <defs>
      <clipPath :id="clipId">
        <rect x="0" y="0" width="360" height="206" />
      </clipPath>
    </defs>
    <g :clip-path="`url(#${clipId})`">
      <template v-if="variant === 'closed'">
        <circle
          cx="180"
          cy="206"
          r="150"
          fill="none"
          stroke="#efd9c9"
          stroke-width="7"
          stroke-linecap="round"
          stroke-dasharray="0 15.7"
        />
        <circle
          cx="180"
          cy="206"
          r="122"
          fill="none"
          stroke="#e8c3a9"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-dasharray="0 12.78"
        />
        <circle
          cx="180"
          cy="206"
          r="96"
          fill="none"
          stroke="#de987f"
          stroke-width="4"
          stroke-linecap="round"
          stroke-dasharray="0 10.05"
        />
        <circle cx="180" cy="206" r="78" fill="#f6d7b3" />
      </template>
      <template v-else>
        <circle
          cx="180"
          cy="206"
          r="140"
          fill="none"
          stroke="#efd9c9"
          stroke-width="7"
          stroke-linecap="round"
          stroke-dasharray="0 14.66"
        />
        <circle
          cx="180"
          cy="206"
          r="112"
          fill="none"
          stroke="#e8c3a9"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="0 11.73"
        />
      </template>
    </g>

    <!-- ground: a row of dots -->
    <line
      x1="24"
      y1="214"
      x2="336"
      y2="214"
      stroke="#d48a6e"
      stroke-width="4"
      stroke-linecap="round"
      stroke-dasharray="0 11"
    />

    <!-- frame -->
    <rect x="126" y="62" width="108" height="146" rx="6" fill="#93432a" />

    <template v-if="variant === 'closed'">
      <rect x="136" y="72" width="88" height="136" rx="3" fill="#bd5d38" />
      <rect
        x="146"
        y="84"
        width="68"
        height="46"
        rx="3"
        fill="none"
        stroke="#93432a"
        stroke-width="3"
      />
      <rect
        x="146"
        y="142"
        width="68"
        height="54"
        rx="3"
        fill="none"
        stroke="#93432a"
        stroke-width="3"
      />
      <circle cx="211" cy="140" r="5" fill="#e7a94a" />
      <path d="M164 72 L180 90 L196 72" fill="none" stroke="#33251e" stroke-width="1.6" />
      <rect
        x="140"
        y="90"
        width="80"
        height="30"
        rx="5"
        fill="#fffdfa"
        stroke="#33251e"
        stroke-width="1.6"
      />
      <text
        x="180"
        y="110"
        text-anchor="middle"
        font-family="Mulish Variable, Mulish, system-ui, sans-serif"
        font-size="10"
        font-weight="700"
        letter-spacing="0.4"
        fill="#93432a"
        aria-hidden="true"
      >
        {{ sign }}
      </text>
    </template>
    <template v-else>
      <rect x="136" y="72" width="88" height="136" rx="2" fill="#f6d7b3" />
      <path d="M224 72 L254 92 L254 220 L224 208 Z" fill="#f6d7b3" opacity="0.55" />
      <circle cx="240" cy="120" r="3" fill="#e7a94a" />
      <circle cx="252" cy="146" r="2.6" fill="#e7a94a" />
      <circle cx="244" cy="176" r="3" fill="#de987f" />
      <circle cx="262" cy="196" r="2.4" fill="#e7a94a" />
      <circle cx="268" cy="132" r="2.2" fill="#de987f" />
      <path d="M136 72 L188 84 L188 198 L136 208 Z" fill="#bd5d38" />
      <path
        d="M144 88 L180 95 L180 130 L144 125 Z"
        fill="none"
        stroke="#93432a"
        stroke-width="2.6"
      />
      <path
        d="M144 140 L180 143 L180 188 L144 194 Z"
        fill="none"
        stroke="#93432a"
        stroke-width="2.6"
      />
      <circle cx="181" cy="140" r="4.2" fill="#e7a94a" />
    </template>

    <!-- step and plants -->
    <rect x="116" y="206" width="128" height="9" rx="2" fill="#696260" />
    <circle cx="94" cy="194" r="15" fill="#4f7552" />
    <circle cx="80" cy="200" r="11" fill="#6f9a71" />
    <circle cx="106" cy="201" r="10" fill="#5f8a62" />
    <template v-if="variant === 'closed'">
      <circle cx="90" cy="190" r="2" fill="#faf5ef" />
      <circle cx="98" cy="198" r="2" fill="#faf5ef" />
      <path
        d="M262 206 C262 192 266 184 272 178 M270 206 C270 194 276 188 284 184 M278 206 C280 196 286 192 294 192"
        fill="none"
        stroke="#4f7552"
        stroke-width="4"
        stroke-linecap="round"
      />
    </template>
  </svg>
</template>
