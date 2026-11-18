<script setup lang="ts">
// Isotipo de OV S-Mart redibujado: bombilla + techo de casa + señal wifi.
// `lit` enciende la bombilla (la luz cálida sale de la ventana): es el recurso de la landing.
defineProps<{ lit?: boolean }>()
</script>

<template>
  <svg class="mark" :class="{ 'mark--lit': lit }" viewBox="0 0 100 150" aria-hidden="true">
    <circle class="mark__halo" cx="50" cy="56" r="44" />
    <g class="mark__stroke" fill="none" stroke-width="9" stroke-linecap="round">
      <path d="M9 61 C3 30 22 5 50 5 C78 5 97 30 91 61" stroke-linecap="butt" />
      <path d="M4 72 L50 45 L96 72" stroke-linecap="butt" stroke-linejoin="miter" />
      <path d="M16 79 C24 92 30 96 28 108 M84 79 C76 92 70 96 72 108" stroke-linecap="butt" />
      <path d="M24 115 Q50 95 76 115" />
      <path d="M36 128 Q50 117 64 128" />
    </g>
    <g class="mark__window">
      <rect x="39" y="66" width="10" height="10" />
      <rect x="51" y="66" width="10" height="10" />
      <rect x="39" y="78" width="10" height="10" />
      <rect x="51" y="78" width="10" height="10" />
    </g>
    <circle class="mark__dot" cx="50" cy="141" r="8" />
  </svg>
</template>

<style scoped lang="scss">
.mark {
  display: block;
  overflow: visible;
  color: currentColor;

  &__stroke {
    stroke: currentColor;
  }
  &__window,
  &__dot {
    fill: currentColor;
    transition: fill 0.5s $ease-out;
  }
  &__halo {
    fill: $glow;
    opacity: 0;
    filter: blur(18px);
    transition: opacity 0.8s $ease-out;
  }

  &--lit &__window {
    fill: $glow;
  }
  &--lit &__halo {
    opacity: 0.35;
  }
}
</style>
