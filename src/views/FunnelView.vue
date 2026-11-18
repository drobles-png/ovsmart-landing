<script setup lang="ts">
// Landing (/). Todo el texto sale de LANDING en src/content/copy.ts.
// Cada botón que abre el registro lleva data-cta="registro" (lo usa el e2e).
// Recurso visual: la casa de noche cuyas luces se encienden solas (OvMark `lit`, interruptores).
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import OvMark from '@/components/OvMark.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import {
  IS_LOCAL,
  PERSON_NAME,
  STORAGE_PREFIX,
  VSL_POSTER,
  VSL_POSTER_FALLBACK,
} from '@/config/funnel'
import { LANDING } from '@/content/copy'
import { captureFbParams } from '@/utils/fbclid'

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)
const showSticky = ref(false)
const lit = ref(false)

// Portada del video: Cloudinary → archivo local → la casa de noche (isotipo encendido)
const poster = ref(VSL_POSTER || VSL_POSTER_FALLBACK)
function onPosterError() {
  poster.value = poster.value !== VSL_POSTER_FALLBACK ? VSL_POSTER_FALLBACK : ''
}

function openModal() {
  // Quien no calificó hace menos de 24 h vuelve a /sin-espacio
  if (!IS_LOCAL) {
    const disqAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_disq_at`))
    if (disqAt && Date.now() - disqAt < 24 * 60 * 60 * 1000) {
      router.push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

const onScroll = () => (showSticky.value = window.scrollY > 700)

// Aparición al hacer scroll: .reveal → .is-in (una sola vez)
let io: IntersectionObserver | undefined
onMounted(() => {
  captureFbParams()
  window.addEventListener('scroll', onScroll, { passive: true })
  if (route.query.editar) modalOpen.value = true
  // la casa "se enciende" al llegar
  setTimeout(() => (lit.value = true), 500)

  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io?.unobserve(e.target)
      }),
    { threshold: 0.25 },
  )
  document.querySelectorAll('.reveal').forEach((el) => io?.observe(el))
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})
</script>

<template>
  <div class="landing">
    <header class="topbar">
      <div class="wrap topbar__inner">
        <BrandLogo />
        <CountdownTimer />
      </div>
    </header>

    <!-- 1 · HERO: la promesa + la casa de noche como portada del video -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="wrap hero__grid">
        <h1 id="hero-title" class="hero__title">
          {{ LANDING.headline }} <span class="hero__accent">{{ LANDING.headlineAccent }}</span>
        </h1>

        <button
          type="button"
          class="vsl"
          :class="{ 'is-lit': lit }"
          data-cta="registro"
          aria-label="Ver el video completo"
          @click="openModal"
        >
          <img
            v-if="poster"
            class="vsl__poster"
            :src="poster"
            alt=""
            fetchpriority="high"
            decoding="async"
            @error="onPosterError"
          />
          <span v-else class="vsl__house" aria-hidden="true">
            <OvMark class="vsl__mark" :lit="lit" />
          </span>
          <span class="vsl__bar">
            <span class="vsl__play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
            <span class="vsl__caption">
              <strong>Mira el video de {{ PERSON_NAME }}</strong>
              <span>{{ LANDING.videoCaption }}</span>
            </span>
          </span>
        </button>

        <div class="hero__copy">
          <p class="hero__sub">{{ LANDING.sub }}</p>
          <div class="hero__cta">
            <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
              <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.cta }}
            </button>
            <p class="hero__note">
              <i class="fa-solid fa-lock" aria-hidden="true"></i> {{ LANDING.ctaNote }}
            </p>
          </div>
          <ul class="hero__facts" role="list">
            <li v-for="f in LANDING.heroFacts" :key="f">{{ f }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 2 · NOCHE: la ronda de cada noche → una sola orden -->
    <section class="night" aria-labelledby="night-title">
      <div class="wrap night__grid">
        <div class="night__copy">
          <p class="night__before">{{ LANDING.routine.before }}</p>
          <h2 id="night-title" class="night__title">
            {{ LANDING.routine.title }}
            <span class="night__command">{{ LANDING.routine.command }}</span>
          </h2>
          <p class="night__after">{{ LANDING.routine.after }}</p>
        </div>

        <div class="panel reveal" role="list" aria-label="Lo que hace la rutina de la noche">
          <div
            v-for="(d, i) in LANDING.routine.devices"
            :key="d.name"
            class="panel__row"
            :class="{ 'is-on-final': d.on }"
            :style="{ '--i': i }"
            role="listitem"
          >
            <i :class="[d.icon, 'panel__icon']" aria-hidden="true"></i>
            <span class="panel__name">{{ d.name }}</span>
            <span class="panel__state">{{ d.on ? 'Encendido' : 'Apagado' }}</span>
            <span class="switch" aria-hidden="true"><span class="switch__knob"></span></span>
          </div>
          <p class="panel__note">{{ LANDING.routine.note }}</p>
        </div>
      </div>
    </section>

    <!-- 3 · CÓMO TRABAJO: las 5 áreas + el proceso -->
    <section class="method" aria-labelledby="method-title">
      <div class="wrap">
        <div class="method__grid">
          <div class="method__head">
            <h2 id="method-title" class="method__title">{{ LANDING.method.title }}</h2>
            <p class="method__sub">{{ LANDING.method.sub }}</p>
          </div>

          <ol class="areas" role="list">
            <li v-for="(a, i) in LANDING.method.areas" :key="a.name" class="areas__item reveal">
              <span class="areas__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="areas__name">
                  <i :class="[a.icon, 'areas__icon']" aria-hidden="true"></i>{{ a.name }}
                </h3>
                <p class="areas__text">{{ a.text }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="process">
          <h3 class="process__title">{{ LANDING.method.stepsTitle }}</h3>
          <ol class="process__list" role="list">
            <li v-for="s in LANDING.method.steps" :key="s.name" class="process__step reveal">
              <span class="process__signal" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
              <h4 class="process__name">{{ s.name }}</h4>
              <p class="process__text">{{ s.text }}</p>
            </li>
          </ol>
          <button type="button" class="btn btn--lg process__cta" data-cta="registro" @click="openModal">
            {{ LANDING.method.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- 4 · LUIS: quién habla, cifras del VSL, para quién es y CTA -->
    <section class="about" aria-labelledby="about-title">
      <div class="wrap about__grid">
        <div class="about__photo" aria-hidden="true">
          <img v-if="poster" :src="poster" alt="" loading="lazy" decoding="async" />
          <OvMark v-else class="about__mark" lit />
        </div>

        <div class="about__copy">
          <h2 id="about-title" class="about__title">{{ LANDING.about.title }}</h2>
          <p class="about__text">{{ LANDING.about.text }}</p>
          <blockquote class="about__quote">
            <p>{{ LANDING.about.quote }}</p>
          </blockquote>

          <dl class="facts">
            <div v-for="f in LANDING.about.facts" :key="f.label" class="facts__item">
              <dt class="facts__value">{{ f.value }} <span>{{ f.unit }}</span></dt>
              <dd class="facts__label">{{ f.label }}</dd>
            </div>
          </dl>

          <h3 class="about__fit-title">{{ LANDING.about.fitTitle }}</h3>
          <ul class="fit" role="list">
            <li v-for="f in LANDING.about.fit" :key="f">
              <i class="fa-solid fa-check" aria-hidden="true"></i>{{ f }}
            </li>
          </ul>
          <p class="about__notfit">{{ LANDING.about.notFit }}</p>

          <div class="about__cta">
            <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
              <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.about.cta }}
            </button>
            <p class="about__note">{{ LANDING.about.ctaNote }}</p>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter :disclaimer="LANDING.disclaimer" />

    <!-- CTA fijo en celular -->
    <Transition name="sticky">
      <div v-if="showSticky && !modalOpen" class="sticky" role="region" aria-label="Ver el video">
        <div class="sticky__copy">
          <strong>{{ LANDING.sticky.title }}</strong>
          <span>{{ LANDING.sticky.sub }}</span>
        </div>
        <button type="button" class="btn" data-cta="registro" @click="openModal">
          {{ LANDING.sticky.cta }} <i class="fa-solid fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </Transition>

    <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<style scoped lang="scss">
// ── Aparición ────────────────────────────────────────────────────────────────
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.7s $ease-out,
    transform 0.7s $ease-out;

  &.is-in {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

// ── Encabezado ───────────────────────────────────────────────────────────────
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid $line;
  background: rgba($surface, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 64px;
  }
}

// ── 1 · Hero ─────────────────────────────────────────────────────────────────
.hero {
  padding: 36px 0 64px;
  background:
    radial-gradient(60% 50% at 85% 10%, rgba($primary, 0.08), transparent 70%),
    $surface;

  &__grid {
    display: grid;
    gap: 24px;

    @media (min-width: 960px) {
      grid-template-columns: 1.05fr 1fr;
      grid-template-areas:
        'title media'
        'copy media';
      column-gap: 56px;
      row-gap: 28px;
      align-items: start;
      padding-top: 24px;
    }
  }

  &__title {
    font-size: clamp(2.2rem, 8.4vw, 3.9rem);
    line-height: 1.02;
    letter-spacing: -0.04em;

    @media (min-width: 960px) {
      grid-area: title;
      align-self: end;
    }
  }

  &__accent {
    color: $primary;
  }

  &__copy {
    @media (min-width: 960px) {
      grid-area: copy;
    }
  }

  &__sub {
    max-width: 520px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 24px;

    @media (max-width: 600px) {
      align-items: stretch;
      text-align: center;
    }
  }

  &__note {
    color: $ink-muted;
    font-size: 0.85rem;
  }

  &__facts {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
    margin: 28px 0 0;
    padding: 20px 0 0;
    border-top: 1px solid $line;
    list-style: none;
    color: $ink;
    font-size: 0.9rem;
    font-weight: 500;

    li {
      display: inline-flex;
      align-items: center;
      gap: 8px;

      &::before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: $primary;
      }
    }
  }
}

// Portada del video: la casa de noche que se enciende
.vsl {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  border-radius: $radius-lg;
  background:
    radial-gradient(70% 60% at 50% 40%, $night-2, $surface-dark 75%);
  color: $ink-on-dark;
  cursor: pointer;
  font: inherit;
  text-align: left;
  overflow: hidden;
  box-shadow: 0 30px 60px -30px rgba($surface-dark, 0.6);

  @media (min-width: 960px) {
    grid-area: media;
    aspect-ratio: 4 / 5;
  }

  &__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__house {
    position: absolute;
    inset: 10% 0 96px;
  }

  // el SVG centra solo (preserveAspectRatio) dentro del espacio libre sobre la barra
  &__mark {
    width: 100%;
    height: 100%;
    color: rgba($ink-on-dark, 0.92);
  }

  &__bar {
    position: absolute;
    right: 12px;
    bottom: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 16px 10px 10px;
    border: 1px solid rgba(#fff, 0.12);
    border-radius: 14px;
    background: rgba($surface-dark, 0.62);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  &__play {
    display: grid;
    flex: none;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: $primary;
    color: $on-primary;
    font-size: 1.1rem;
    transition:
      transform 0.2s $ease-out,
      background-color 0.4s $ease-out,
      color 0.4s $ease-out;
  }

  &.is-lit &__play {
    background: $glow;
    color: $surface-dark;
  }

  &:hover &__play {
    transform: scale(1.06);
  }

  &:active &__play {
    transform: scale(0.97);
  }

  &__caption {
    display: flex;
    flex-direction: column;
    color: $ink-on-dark-muted;
    font-size: 0.85rem;
    line-height: 1.35;

    strong {
      color: $ink-on-dark;
      font-size: 1rem;
      font-weight: 600;
    }
  }
}

// ── 2 · Noche ────────────────────────────────────────────────────────────────
.night {
  padding: 80px 0;
  background:
    radial-gradient(50% 60% at 15% 100%, rgba($primary, 0.35), transparent 70%),
    $surface-dark;
  color: $ink-on-dark;

  &__grid {
    display: grid;
    gap: 40px;

    @media (min-width: 960px) {
      grid-template-columns: 1.1fr 1fr;
      gap: 72px;
      align-items: center;
    }
  }

  &__before {
    max-width: 440px;
    color: $ink-on-dark-muted;
    font-size: 1rem;
  }

  &__title {
    margin: 20px 0 12px;
    font-size: clamp(1.4rem, 4vw, 1.75rem);
    font-weight: 500;
    color: $ink-on-dark-muted;
  }

  &__command {
    display: block;
    margin-top: 6px;
    color: $glow;
    font-size: clamp(2.3rem, 8vw, 4rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    text-shadow: 0 0 40px rgba($glow, 0.35);
  }

  &__after {
    font-family: $font-display;
    font-size: clamp(1.25rem, 3.4vw, 1.6rem);
    font-weight: 700;
    letter-spacing: -0.02em;
  }
}

// Panel de interruptores: al entrar en pantalla se apagan uno tras otro;
// el aire de la habitación queda encendido (lo dice el VSL).
.panel {
  padding: 8px;
  border: 1px solid rgba(#fff, 0.1);
  border-radius: $radius-lg;
  background: rgba($night-2, 0.7);

  &__row {
    display: grid;
    grid-template-columns: 28px 1fr auto auto;
    align-items: center;
    gap: 12px;
    min-height: 64px;
    padding: 0 14px;
    border-radius: 12px;

    & + & {
      border-top: 1px solid rgba(#fff, 0.06);
    }
  }

  &__icon {
    color: $glow;
    text-align: center;
    transition: color 0.4s $ease-out;
    transition-delay: calc(var(--i) * 280ms + 300ms);
  }

  &__name {
    font-weight: 500;
  }

  &__state {
    color: $ink-on-dark-muted;
    font-size: 0.8rem;

    @media (max-width: 380px) {
      display: none;
    }
  }

  &__note {
    padding: 14px 14px 10px;
    border-top: 1px solid rgba(#fff, 0.06);
    color: $ink-on-dark-muted;
    font-size: 0.85rem;
  }
}

.switch {
  position: relative;
  width: 46px;
  height: 26px;
  border-radius: 999px;
  background: $glow;
  transition: background-color 0.4s $ease-out;
  transition-delay: calc(var(--i) * 280ms + 300ms);

  &__knob {
    position: absolute;
    top: 3px;
    left: 23px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.4s $ease-out;
    transition-delay: calc(var(--i) * 280ms + 300ms);
  }
}

// Estado final: todo apagado menos lo marcado como encendido
.panel.is-in .panel__row:not(.is-on-final) {
  .panel__icon {
    color: rgba($ink-on-dark-muted, 0.5);
  }
  .switch {
    background: rgba(#fff, 0.16);
  }
  .switch__knob {
    transform: translateX(-20px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel__icon,
  .switch,
  .switch__knob {
    transition: none;
  }
}

// ── 3 · Cómo trabajo ─────────────────────────────────────────────────────────
.method {
  padding: 88px 0;

  &__grid {
    display: grid;
    gap: 36px;

    @media (min-width: 960px) {
      grid-template-columns: 0.9fr 1.1fr;
      gap: 72px;
    }
  }

  &__head {
    @media (min-width: 960px) {
      position: sticky;
      top: 104px;
      align-self: start;
    }
  }

  &__title {
    font-size: clamp(1.75rem, 5vw, 2.6rem);
  }

  &__sub {
    max-width: 460px;
    margin-top: 16px;
    color: $ink-muted;
  }
}

.areas {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid $line;

  &__item {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 8px;
    padding: 24px 0;
    border-bottom: 1px solid $line;
  }

  &__num {
    padding-top: 4px;
    color: $primary;
    font-family: $font-display;
    font-size: 0.95rem;
    font-weight: 700;
  }

  &__name {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.3rem;
  }

  &__icon {
    color: $primary;
    font-size: 1rem;
  }

  &__text {
    margin-top: 6px;
    color: $ink-muted;
  }
}

.process {
  margin-top: 80px;
  padding: 40px 24px;
  border-radius: $radius-lg;
  background: $raised;
  border: 1px solid $line;

  @media (min-width: 960px) {
    padding: 48px;
  }

  &__title {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }

  &__list {
    position: relative;
    display: grid;
    gap: 28px;
    margin: 32px 0 0;
    padding: 0;
    list-style: none;

    @media (min-width: 900px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 28px;

      // línea que une las señales
      &::before {
        content: '';
        position: absolute;
        top: 15px;
        right: 12%;
        left: 34px;
        height: 1px;
        background: $line;
      }
    }
  }

  &__step {
    position: relative;
  }

  // La señal wifi del logo como marcador de cada paso
  &__signal {
    position: relative;
    display: block;
    width: 32px;
    height: 32px;
    margin-bottom: 14px;
    border-radius: 50%;
    background: $primary;

    span:nth-child(1) {
      position: absolute;
      bottom: 8px;
      left: 13px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fff;
    }
    span:nth-child(2),
    span:nth-child(3) {
      position: absolute;
      left: 50%;
      border: 2px solid #fff;
      border-color: #fff transparent transparent;
      border-radius: 50%;
      transform: translateX(-50%);
    }
    span:nth-child(2) {
      bottom: 4px;
      width: 14px;
      height: 14px;
    }
    span:nth-child(3) {
      bottom: 1px;
      width: 22px;
      height: 22px;
    }
  }

  &__name {
    margin: 0;
    font-family: $font-display;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  &__text {
    margin-top: 6px;
    color: $ink-muted;
    font-size: 0.95rem;
  }

  &__cta {
    margin-top: 36px;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
}

// ── 4 · Luis ─────────────────────────────────────────────────────────────────
.about {
  padding: 88px 0;
  background: $raised;
  border-top: 1px solid $line;

  &__grid {
    display: grid;
    gap: 36px;

    @media (min-width: 960px) {
      grid-template-columns: 0.85fr 1.15fr;
      gap: 72px;
      align-items: start;
    }
  }

  &__photo {
    display: grid;
    place-items: center;
    aspect-ratio: 4 / 5;
    max-height: 520px;
    border-radius: $radius-lg;
    background: radial-gradient(70% 60% at 50% 35%, $night-2, $surface-dark 80%);
    color: rgba($ink-on-dark, 0.9);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 20%;
    }

    @media (min-width: 960px) {
      position: sticky;
      top: 104px;
    }
  }

  &__mark {
    width: 100%;
    height: 46%;
  }

  &__title {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  &__text {
    margin-top: 16px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  &__quote {
    margin: 28px 0 0;
    padding: 0;

    &::before {
      content: '“';
      display: block;
      height: 0.5em;
      color: $primary;
      font-family: $font-display;
      font-size: 4rem;
      font-weight: 700;
      line-height: 1;
    }

    p {
      font-family: $font-display;
      font-size: clamp(1.2rem, 3.4vw, 1.5rem);
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.02em;
    }
  }

  &__fit-title {
    margin-top: 40px;
    font-size: 1.25rem;
  }

  &__notfit {
    margin-top: 16px;
    color: $ink-muted;
    font-size: 0.95rem;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 32px;

    @media (max-width: 600px) {
      align-items: stretch;
      text-align: center;
    }
  }

  &__note {
    color: $ink-muted;
    font-size: 0.85rem;
  }
}

.facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 36px 0 0;
  padding: 24px 0;
  border-block: 1px solid $line;

  &__item {
    margin: 0;
  }

  &__value {
    color: $primary;
    font-family: $font-display;
    font-size: clamp(2rem, 7vw, 2.75rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;

    span {
      font-size: 0.4em;
      letter-spacing: 0;
    }
  }

  &__label {
    margin: 6px 0 0;
    color: $ink-muted;
    font-size: 0.85rem;
    line-height: 1.4;
  }
}

.fit {
  display: grid;
  gap: 12px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 8px;
  }

  i {
    padding-top: 5px;
    color: $primary;
  }
}

// ── CTA fijo ─────────────────────────────────────────────────────────────────
.sticky {
  position: fixed;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  left: 12px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 10px 10px 16px;
  border: 1px solid rgba(#fff, 0.1);
  border-radius: $radius-md;
  background: $surface-dark;
  color: $ink-on-dark;
  box-shadow: $shadow-modal;

  &__copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    color: $ink-on-dark-muted;
    font-size: 0.8rem;

    strong {
      overflow: hidden;
      color: $ink-on-dark;
      font-size: 0.9rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .btn {
    flex: none;
  }

  @media (min-width: 900px) {
    right: auto;
    left: 50%;
    width: 560px;
    transform: translateX(-50%);
  }
}

.sticky-enter-active,
.sticky-leave-active {
  transition:
    opacity 0.2s ease,
    translate 0.2s ease;
}
.sticky-enter-from,
.sticky-leave-to {
  opacity: 0;
  translate: 0 12px;
}
</style>
