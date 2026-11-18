// Modelo de cualificación del funnel: UNA sola fuente de verdad.
// Para un cliente nuevo solo se editan QUESTIONS, OBJETIVO y la regla de qualifies().
// Salen del cierre del VSL / de lo que el cliente define como "sí es cliente" (no inventar).
//
// Cada respuesta viaja a GHL como `<key>` (valor interno) y `<key>_label` (texto legible:
// es el que se mapea en los campos personalizados). Ver references/contrato-ghl.md de la skill.
// Los `value` son estables: si GHL ya está mapeado, NO renombrarlos (solo agregar).

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  key: string
  title: string
  /** Etiqueta corta para la nota del CRM */
  noteLabel: string
  options: readonly QuestionOption[]
}

export const QUESTIONS = [
  {
    key: 'espacio',
    title: '¿Qué quieres automatizar?',
    noteLabel: 'Espacio',
    options: [
      { value: 'casa_terminada', label: 'Mi casa, ya terminada' },
      { value: 'en_construccion', label: 'Una casa que estoy construyendo' },
      { value: 'oficina', label: 'Una oficina o un consultorio' },
    ],
  },
  {
    key: 'zona',
    title: '¿Dónde está?',
    noteLabel: 'Zona',
    options: [
      { value: 'guayaquil', label: 'Guayaquil' },
      { value: 'daule', label: 'Daule' },
      { value: 'mocoli', label: 'Mocolí' },
      { value: 'otra_zona', label: 'En otra ciudad' },
    ],
  },
  {
    key: 'inversion',
    title: '¿Cuánto piensas invertir en tu proyecto?',
    noteLabel: 'Inversión',
    options: [
      { value: 'menos_1k', label: 'Menos de $1.000' },
      { value: 'de_1k_a_3k', label: 'Entre $1.000 y $3.000' },
      { value: 'de_3k_a_6k', label: 'Entre $3.000 y $6.000' },
      { value: 'mas_6k', label: 'Más de $6.000' },
    ],
  },
] as const satisfies readonly Question[]

/** Último paso: pregunta abierta (va a GHL como `objetivo`). */
export const OBJETIVO = {
  title: '¿Qué te gustaría que fuera más fácil en tu casa?',
  placeholder: 'Ej.: que las luces de abajo se apaguen solas en la noche y que el wifi llegue al cuarto del fondo',
  minWords: 6,
}

export type QuestionKey = (typeof QUESTIONS)[number]['key']
export type Answers = Record<QuestionKey, string>

export const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.key, ''])) as Answers

export function labelFor(key: QuestionKey, value: string): string {
  const q = QUESTIONS.find((x) => x.key === key)
  return q?.options.find((o) => o.value === value)?.label ?? value
}

// ── Regla de cualificación ────────────────────────────────────────────────────
// Del VSL: "Trabajo con proyectos desde mil dólares" y atiende en Guayaquil, Daule y Mocolí.
// No califica: inversión menor a $1.000 o fuera de esas zonas. Confirmar con Luis.
const DISQUALIFY: Partial<Record<QuestionKey, readonly string[]>> = {
  zona: ['otra_zona'],
  inversion: ['menos_1k'],
}

export function qualifies(a: Answers): boolean {
  return (Object.keys(DISQUALIFY) as QuestionKey[]).every(
    (k) => !(DISQUALIFY[k] ?? []).includes(a[k]),
  )
}
