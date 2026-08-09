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

export type Era = 'PRE_2000' | '2000_2009' | '2010_2019' | '2020_NOW'

export interface DocMeta {
  slug: string
  title: string
  author: string
  year: number
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
