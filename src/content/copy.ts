// Textos de la página. Un cliente nuevo edita SOLO este archivo (y config/funnel.ts).
// Todo lo que está entre [corchetes] es un marcador: reemplazar con lo que dice el VSL del cliente.
// No inventar cifras, testimonios, garantías ni bonos.
import { BRAND_NAME, PERSON_NAME } from '@/config/funnel'

export interface Testimonial {
  name: string
  role: string
  quote: string
  /** Resultado concreto que dijo el testimonio (opcional): "+30% en ventas" */
  result?: string
  photo?: string
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
}

export const SEO = {
  landing: {
    title: `${BRAND_NAME} | Domótica en Guayaquil, Daule y Mocolí`,
    description:
      'Automatizamos tu casa o negocio con Alexa, luces, aires, wifi mesh, cámaras y cerraduras. Instalado y funcionando. Visita técnica sin costo.',
  },
  video: {
    title: `Mira el video | ${BRAND_NAME}`,
    description: `${PERSON_NAME} te cuenta dos casos reales y cómo trabaja, paso a paso.`,
  },
  booking: { title: `Agenda tu visita técnica | ${BRAND_NAME}`, description: 'Elige el día y la hora de tu visita.' },
  booked: { title: `Visita confirmada | ${BRAND_NAME}`, description: 'Tu visita técnica está confirmada.' },
  noSpace: { title: `Todavía no es el momento | ${BRAND_NAME}`, description: 'Gracias por tu interés.' },
  pago: { title: `Confirma tu lugar | ${BRAND_NAME}`, description: 'Completa tu inscripción.' },
  confirmada: { title: `Inscripción confirmada | ${BRAND_NAME}`, description: 'Tu lugar está confirmado.' },
  privacy: { title: `Política de privacidad | ${BRAND_NAME}`, description: `Política de privacidad de ${BRAND_NAME}.` },
  legal: { title: `Aviso legal | ${BRAND_NAME}`, description: `Aviso legal de ${BRAND_NAME}.` },
}

// ── Landing (/) · estructura corta: hero → rutina → cómo trabajo → Luis ───────
export const LANDING = {
  // Temporizador del encabezado (components/CountdownTimer.vue). short = versión de celular.
  timer: { label: 'Agenda de visitas técnicas', short: 'Agenda', prefix: 'Cierra en' },
  audience: [] as string[], // no se usa (sin chips en el hero)

  // 1 · Hero
  headline: 'Apaga la luz sin levantarte de la cama',
  headlineAccent: 'y llega a una casa que te recibe.',
  sub: `Las incomodidades de todos los días no tienen por qué ser así. ${PERSON_NAME} te cuenta dos casos reales y cómo trabaja, paso a paso.`,
  videoCaption: 'Dos casas, y cómo trabajo',
  cta: 'Ver el video completo',
  ctaNote: 'Sin costo · Solo te pedimos tus datos para mostrártelo',
  heroFacts: ['Visita técnica sin costo', 'Guayaquil, Daule y Mocolí', 'Proyectos desde $1.000'],

  // 2 · Banda oscura: la rutina de la noche (caso 1 del VSL)
  routine: {
    before: 'Cada noche hacían una ronda: revisar las luces de abajo, el aire de la sala, la puerta.',
    title: 'Ahora solo dicen',
    command: '“Alexa, buenas noches”',
    after: 'y se apaga todo abajo. Ya no hay ronda.',
    // Lo que hace la rutina (del VSL). on = queda encendido.
    devices: [
      { icon: 'fa-solid fa-lightbulb', name: 'Luces de abajo', on: false },
      { icon: 'fa-solid fa-couch', name: 'Aire de la sala', on: false },
      { icon: 'fa-solid fa-bed', name: 'Aire de tu habitación', on: true },
    ],
    note: 'Una rutina es una sola orden que realiza varias acciones a la vez. La diseño contigo, según cómo vives.',
  },

  // 3 · Cómo trabajo: las 5 áreas + el proceso
  method: {
    title: 'No estás comprando aparatos. Estás invirtiendo en que tu casa haga lo que necesitas.',
    sub: 'Trabajo en cinco áreas y tú eliges cuáles necesitas. Puedes empezar por lo que más te incomoda hoy e ir sumando con el tiempo.',
    areas: [
      {
        icon: 'fa-solid fa-toggle-on',
        name: 'Control de la casa',
        text: 'Interruptores inteligentes que se ven igual a los que ya tienes. Los usas con la mano, desde el celular o con la voz, y siguen funcionando aunque se vaya la luz.',
      },
      {
        icon: 'fa-solid fa-wifi',
        name: 'Wifi en toda la casa',
        text: 'Red mesh: varios equipos que trabajan como una sola red. Si contratas mil megas, esos mil megas llegan a toda la casa.',
      },
      {
        icon: 'fa-solid fa-shield-halved',
        name: 'Seguridad',
        text: 'Cámaras wifi o con grabador, que siguen grabando sin luz ni internet. Cerraduras que abres con tu huella o tu rostro.',
      },
      {
        icon: 'fa-solid fa-music',
        name: 'Sonido',
        text: 'Parlantes de interior y exterior para la sala, la terraza o la piscina, controlados desde el celular. Sin cables sueltos.',
      },
      {
        icon: 'fa-solid fa-wand-magic-sparkles',
        name: 'Rutinas',
        text: '“Alexa, buenos días”: se encienden las luces de la cocina, se apaga el aire del cuarto y empieza tu música.',
      },
    ],
    stepsTitle: 'Así empezamos',
    steps: [
      {
        name: 'Visita técnica sin costo',
        text: 'Reviso el espacio, cómo llega el internet y cómo entras y sales de casa. Sobre todo, conversamos: qué es lo que más te incomoda.',
      },
      {
        name: 'Propuesta a tu medida',
        text: 'Según lo que necesitas y lo que puedes invertir. Si tu presupuesto es para un ambiente, empezamos por el que más impacto tenga en tu día.',
      },
      {
        name: 'Instalada en una semana',
        text: 'En una casa terminada te la entrego funcionando en una semana. Si estás en obra gris, dejo todo cableado en el momento correcto.',
      },
      {
        name: 'Te enseño y sigo contigo',
        text: 'Te enseño a usarlo hasta que te sientas cómodo. Un año de garantía en los equipos, y si después tienes una duda, me escribes.',
      },
    ],
    cta: 'Ver cómo lo hice en dos casas',
  },

  // 4 · Quién habla
  about: {
    title: 'Hola, soy Luis.',
    text: 'Desde hace unos cuatro años automatizo casas y negocios en Guayaquil, Daule y Mocolí. Empecé en mi propia casa, porque me apasionaba, y las personas que me visitaban me preguntaban si se lo podía hacer a ellos también.',
    quote:
      'Mis clientes no me buscan por la tecnología. Me buscan porque quieren vivir con más comodidad y con más tranquilidad.',
    facts: [
      { value: '4', unit: 'años', label: 'automatizando casas y negocios' },
      { value: '1', unit: 'semana', label: 'para entregar una casa terminada' },
      { value: '1', unit: 'año', label: 'de garantía en los equipos' },
    ],
    fitTitle: 'Es para ti si',
    fit: [
      'Tu casa ya está terminada y quieres vivirla sin estar pendiente de cada luz y cada aire.',
      'Estás construyendo: dejo todo cableado y planificado desde el inicio, sin que se vea un cable.',
      'Tienes una oficina o un consultorio y quieres saber quién entra y a qué hora.',
    ],
    notFit: 'No es para ti si solo buscas comprar un Alexa por tu cuenta o el equipo más económico.',
    cta: 'Ver el video completo',
    ctaNote: 'Después del video puedes agendar tu visita técnica sin costo.',
  },

  // Componentes de la plantilla que no usa esta landing (sin items no se muestran)
  testimonials: { eyebrow: '', title: '', items: [] as Testimonial[] },
  team: { eyebrow: '', title: '', items: [] as TeamMember[] },

  sticky: { title: 'Visita técnica sin costo', sub: `Video de ${PERSON_NAME} · ${BRAND_NAME}`, cta: 'Ver video' },
  disclaimer:
    'Cada proyecto se cotiza según tu espacio y tu presupuesto. Este sitio no está respaldado por Meta Platforms, Inc. ni forma parte de Facebook.',
}

// ── Modal de registro ─────────────────────────────────────────────────────────
export const REGISTRO = {
  eyebrow: 'Video de Luis · OV S-Mart',
  title: 'Mira el video completo',
  sub: 'Dos casos reales y cómo trabajo, paso a paso. Al final puedes agendar tu visita técnica sin costo.',
  submit: 'Ver el video completo',
  submitPago: 'Continuar',
  legal: 'Tus datos están seguros · No spam',
}

// ── /ver-video ────────────────────────────────────────────────────────────────
export const VIDEO = {
  step: 'Paso 1 de 2',
  eyebrow: `${PERSON_NAME} · ${BRAND_NAME}`,
  title: 'Dos casas, dos familias y cómo cambió su día a día',
  sub: 'Mira el video completo. Al final puedes agendar tu visita técnica sin costo.',
  lockText: 'El botón se habilita en',
  cta: 'Agendar mi visita técnica',
  trust: 'Visita sin costo y sin compromiso · Guayaquil, Daule y Mocolí',
}

// ── Cualificación (las preguntas están en utils/qualification.ts) ─────────────
export const CUALIFICACION = {
  eyebrow: 'Último paso',
  title: 'Cuéntame de tu casa',
  sub: 'Una pregunta a la vez. Te toma un minuto.',
  consent: `Acepto que ${BRAND_NAME} me contacte por WhatsApp y correo, y acepto su`,
  submit: 'Ver horarios disponibles',
}

// ── /agendar ──────────────────────────────────────────────────────────────────
export const BOOKING = {
  step: 'Paso 2 de 2',
  title: 'Elige el día de tu visita técnica',
  sub: 'Reviso tu espacio y conversamos sobre qué te gustaría que fuera más fácil en tu casa. Sin costo y sin compromiso.',
  pending:
    'Estamos terminando de configurar el calendario. Te escribiremos por WhatsApp para coordinar tu visita.',
}

// ── /cita-confirmada ──────────────────────────────────────────────────────────
export const BOOKED = {
  title: 'Tu visita técnica está confirmada',
  sub: 'Te enviamos los detalles a tu correo.',
  steps: [
    { icon: 'fa-solid fa-envelope', title: 'Revisa tu correo', text: 'Ahí tienes la fecha y la hora de la visita.' },
    { icon: 'fa-brands fa-whatsapp', title: 'Te escribo por WhatsApp', text: 'Para confirmar la dirección y resolver dudas antes.' },
    {
      icon: 'fa-solid fa-list-check',
      title: 'Piensa en tu día a día',
      text: 'No necesitas saber de tecnología. Solo ten claro qué te gustaría que fuera más fácil en tu casa.',
    },
  ],
}

// ── /sin-espacio ──────────────────────────────────────────────────────────────
export const NO_SPACE = {
  title: 'Todavía no es el momento, y está bien',
  text: 'Por ahora trabajo con proyectos desde $1.000 en Guayaquil, Daule y Mocolí, y tu caso no encaja todavía. Cuando estés listo, aquí estamos.',
  cooldown: 'Ya enviaste una solicitud. Podrás intentarlo de nuevo en',
  resourcesTitle: `Sigue a ${BRAND_NAME}`,
  resourcesText: 'Mira en nuestras redes cómo quedan las casas que automatizamos.',
}

// ── Pago (opcional) ───────────────────────────────────────────────────────────
export const PAGO = {
  step: 'Paso 2 de 2 · Confirma tu lugar',
  title: 'falta un paso para confirmar tu lugar',
  sub: 'Tu lugar queda reservado cuando completas el pago.',
  bullets: ['[Formato: en vivo, en línea]', '[Qué se lleva el asistente]'],
  noLink: 'Recibimos tus datos. Te enviaremos el enlace de pago a tu WhatsApp y a tu correo.',
  whatsappMsg: (nombre: string) => `Hola, soy ${nombre}. Me registré y quiero completar mi pago.`,
  expired: 'El formulario de pago venció por seguridad. Ábrelo de nuevo para pagar.',
  loadError: 'No pudimos cargar el pago. Inténtalo de nuevo o escríbenos.',
}

export const CONFIRMADA = {
  title: 'Tu lugar está confirmado',
  steps: [
    { icon: 'fa-solid fa-envelope-open-text', text: 'Revisa tu correo: ahí te llega la confirmación y el acceso.' },
    { icon: 'fa-brands fa-whatsapp', text: 'Te escribiremos por WhatsApp antes de empezar.' },
    { icon: 'fa-solid fa-list-check', text: '[Qué preparar antes del evento]' },
  ],
  calendarTitle: '¿Prefieres que veamos tu caso? Agenda una reunión',
  calendarButton: 'Agendar una reunión',
  // Solo con Payphone: estados mientras se confirma el pago o si no se aprobó
  checking: 'Confirmando tu pago…',
  checkingSub: 'No cierres esta página, toma unos segundos.',
  failedTitle: 'Tu pago no se completó',
  failedSub: 'Payphone no aprobó el cobro. Puedes intentarlo de nuevo con otra tarjeta.',
  nodataTitle: 'No encontramos un pago en este enlace',
  nodataSub: 'Si ya pagaste, te llega la confirmación a tu correo. Si no, completa tu pago aquí.',
  errorTitle: 'No pudimos confirmar tu pago',
  errorSub: 'Si se te descontó el dinero, escríbenos con este número de transacción y lo revisamos.',
  helpMsg: (nombre: string, tx: string) =>
    `Hola, soy ${nombre}. Pagué y no me aparece confirmado${tx ? ` (transacción ${tx})` : ''}.`,
}
