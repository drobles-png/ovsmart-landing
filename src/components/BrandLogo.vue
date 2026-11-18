<script setup lang="ts">
// Logo OV S-Mart: isotipo redibujado (OvMark) + wordmark en Saira, como el logo horizontal.
import OvMark from '@/components/OvMark.vue'
import { BRAND_NAME } from '@/config/funnel'

defineProps<{ light?: boolean }>()
</script>

<template>
  <span class="logo" :class="{ 'logo--light': light }" role="img" :aria-label="BRAND_NAME">
    <OvMark class="logo__mark" />
    <span class="logo__word" aria-hidden="true">OV-SMART</span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: $primary;

  &__mark {
    width: 22px;
    height: 33px;
  }

  &__word {
    font-family: $font-word;
    font-weight: 700;
    font-size: 1.35rem;
    line-height: 1;
    letter-spacing: 0.02em;
  }

  &--light {
    color: $ink-on-dark;
  }
}
</style>
