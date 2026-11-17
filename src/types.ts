export type Category =
  | 'VC_DOCTRINE'
  | 'TECHNICAL_PAPER'
  | 'WORLDVIEW'
  | 'SHORT_ACTIVIST'
  | 'MACRO_MEMO'
  | 'AI_ESSAY'
  | 'PITCH_DECK'
  | 'SECTOR_REPORT'
  | 'CRYPTO'
  | 'LLM'
  | 'CYBER'
  | 'AI_SAFETY'
  | 'AI_SCIENCE'
  | 'HARDWARE'

export type Era = 'PRE_2000' | '2000_2009' | '2010_2019' | '2020_NOW'

export interface DocMeta {
  slug: string
  title: string
  author: string
  year: number
  /** ISO date when known: YYYY-MM-DD or YYYY-MM */
  date?: string
  medium: string
  category: Category
  blurb: string
  sourceUrl: string
}

export interface TimelineEntry {
  year: string
  text: string
}

export interface MechanismStep {
  label: string
  detail: string
}

export interface StatChip {
  label: string
  value: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface DeepDiveConnection {
  label: string
  note: string
  slug?: string
}

export interface DeepDive {
  paragraphs: string[]
  connections: DeepDiveConnection[]
}

export interface SectorSnapshotItem {
  name: string
  year: string
  detail: string
}

export interface VCPlayer {
  name: string
  detail: string
}

export interface VCFieldGuide {
  framing: string
  startups: VCPlayer[]
  funds: VCPlayer[]
}

export interface RichContent {
  context: string
  mechanism: MechanismStep[]
  since: TimelineEntry[]
  stats: StatChip[]
  quiz: QuizQuestion[]
  deepDive: DeepDive
  sectorSnapshot: SectorSnapshotItem[]
}

export const CATEGORY_LABELS: Record<Category, string> = {
  VC_DOCTRINE: 'VC Doctrine',
  TECHNICAL_PAPER: 'Technical Paper',
  WORLDVIEW: 'Worldview',
  SHORT_ACTIVIST: 'Short / Activist',
  MACRO_MEMO: 'Macro Memo',
  AI_ESSAY: 'AI Essay',
  PITCH_DECK: 'Pitch Deck',
  SECTOR_REPORT: 'Sector Report',
  CRYPTO: 'Crypto',
  LLM: 'LLM & Models',
  CYBER: 'Cyber',
  AI_SAFETY: 'AI Safety',
  AI_SCIENCE: 'AI for Science',
  HARDWARE: 'Electronics & Compute',
}

export function eraOf(year: number): Era {
  if (year < 2000) return 'PRE_2000'
  if (year < 2010) return '2000_2009'
  if (year < 2020) return '2010_2019'
  return '2020_NOW'
}

export const ERA_LABELS: Record<Era, string> = {
  PRE_2000: 'Before 2000',
  '2000_2009': '2000 to 2009',
  '2010_2019': '2010 to 2019',
  '2020_NOW': '2020 to now',
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Classic date formatting: "16 November 2026", "November 2026", or the year alone. */
export function formatDate(doc: Pick<DocMeta, 'year' | 'date'>, short = false): string {
  if (!doc.date) return String(doc.year)
  const [y, m, d] = doc.date.split('-').map(Number)
  const month = short ? MONTHS[m - 1].slice(0, 3) : MONTHS[m - 1]
  return d ? `${d} ${month} ${y}` : `${month} ${y}`
}
