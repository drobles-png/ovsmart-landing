# OV S-Mart — funnel VSL (Luis, domótica)

Creado con la skill `landings-vsl` desde `drobles-png/landings-vsl`. Repo: `drobles-png/ovsmart-landing`.
Cliente: OV S-Mart · domótica para casas y negocios en Guayaquil, Daule y Mocolí · IG @ov_smart_ · FB id 61580262406977.
Estrategia (ficha_tecnica): "Leads para vendedores" → el funnel filtra y agenda la **visita técnica sin costo**.

## Stack y comandos
Vue 3 + Vite + TS · SCSS · Pinia · vue-router · pnpm · función de Vercel `api/capi.ts`.
`pnpm dev --port 5177 --strictPort` (5174 y 5176 los usan otras landings) · `pnpm type-check` · `pnpm build`.
E2E: `python3 ~/.claude/skills/landings-vsl/scripts/e2e_funnel.py --base http://localhost:5177 --steps e2e/agenda.json`

## Flujo (agenda, sin pago)
`/` → registro → `/ver-video` → cualificación → califica: `/agendar` (calendario GHL `uWVEIjy5aPLrrSu8U27J`)
→ `/cita-confirmada` · no califica: `/sin-espacio` (24 h).

## Config (`src/config/funnel.ts`)
Pixel `3778681772287543` · webhooks de contacto (`…BGDwzu6d`) y cualificación (`…9TUnkOdA`) de la subcuenta del cliente ·
`ASK_CITY = false` (la zona va en la cualificación) · `STORAGE_PREFIX = 'ov'` · `FUNNEL_TAG = 'funnel-ovsmart'` ·
`SITE_URL = https://ovsmart-lng.vercel.app` · `WISTIA_MEDIA_ID` vacío (pendiente) · `VSL_POSTER` vacío (pendiente).
`META_CAPI_TOKEN` solo en `.env.local` y Vercel.

## Landing (FunnelView.vue) — estructura corta, 4 bloques
Recurso propio: la casa de noche cuyas luces se encienden solas. Isotipo redibujado en `OvMark.vue`
(bombilla + techo + señal wifi; prop `lit` enciende la ventana en luz cálida `$glow`).
1. Hero claro: titular del cierre del VSL + portada del video = la casa de noche que se enciende al cargar.
2. Banda de noche: "la ronda" del caso 1 → «Alexa, buenas noches» + panel de interruptores que se apagan
   uno tras otro (el aire de la habitación queda encendido, como dice el VSL).
3. Cómo trabajo: las 5 áreas en lista editorial + "Así empezamos" (4 pasos con la señal wifi del logo).
4. Luis: presentación, cita, cifras (4 años · 1 semana · 1 año de garantía), "Es para ti si" y CTA.
Sin foto de Luis, la portada y su sección muestran el isotipo encendido; al poner `VSL_POSTER(_FALLBACK)` salen las fotos.
Marca: `tokens.scss` (azul #0448c8, noche #061433, luz #ffc24b). Helvetica Neue (títulos) + Poppins (texto) de la ficha;
Saira 700 solo para el wordmark (subset `text=OV-SMART`).

## Cualificación (`src/utils/qualification.ts`)
`espacio` (casa_terminada, en_construccion, oficina) · `zona` (guayaquil, daule, mocoli, otra_zona) ·
`inversion` (menos_1k, de_1k_a_3k, de_3k_a_6k, mas_6k) · abierta `objetivo` (mín. 6 palabras).
**No califica** si `zona = otra_zona` o `inversion = menos_1k` (VSL: "proyectos desde mil dólares"). Confirmar con Luis.

## Pendientes
- Media ID de Wistia del VSL (`WISTIA_MEDIA_ID`).
- Fotos de Luis (portada del video y su sección) y, si hay, fotos de casas instaladas.
- `LEGAL` (razón social, RUC, correo): las páginas legales muestran "[Pendiente]". No pautar así.
- Confirmar la regla de cualificación con Luis. `WHATSAPP_NUMBER` para `/sin-espacio`.
- Publicado en https://ovsmart-lng.vercel.app (Vercel `bakano-proyects/ovsmart-landing`, Git conectado). CAPI desde la landing
  (`META_PIXEL_ID` y `META_CAPI_TOKEN` en Vercel). Falta: quitar el dominio `ovsmart-landing.vercel.app` (panel → Domains),
  Probador de eventos con `META_CAPI_TEST_EVENT_CODE` y workflows de GHL (snapshot).
