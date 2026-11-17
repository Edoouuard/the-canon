import type { Category } from '../types'

export const ART = {
  terrace: '/art/terrace.jpg',
  temple: '/art/temple.jpg',
} as const

export interface Gallery {
  category: Category
  description: string
  art: keyof typeof ART
  /** background-position used to crop a distinct region of the painting */
  focus: string
  accent: string
}

/** Display order of galleries across the site: newest AI fields first. */
export const GALLERIES: Gallery[] = [
  { category: 'LLM', description: 'The papers and releases behind large language models.', art: 'temple', focus: '52% 38%', accent: '#e6cc8f' },
  { category: 'CYBER', description: 'Where AI meets attack, defense and mathematical proof.', art: 'terrace', focus: '14% 52%', accent: '#b8693f' },
  { category: 'AI_SAFETY', description: 'Alignment, oversight and the pace of the frontier.', art: 'temple', focus: '86% 56%', accent: '#7b98b6' },
  { category: 'HARDWARE', description: 'Chips, photonics and the physical machines that compute.', art: 'temple', focus: '88% 40%', accent: '#7b98b6' },
  { category: 'AI_SCIENCE', description: 'AI turned toward mathematics, biology and discovery.', art: 'terrace', focus: '86% 72%', accent: '#8b8a52' },
  { category: 'TECHNICAL_PAPER', description: 'Foundational papers that changed what machines can do.', art: 'terrace', focus: '50% 18%', accent: '#7b98b6' },
  { category: 'AI_ESSAY', description: 'Essays on what powerful AI will mean for everyone.', art: 'temple', focus: '12% 42%', accent: '#8b8a52' },
  { category: 'VC_DOCTRINE', description: 'The essays that taught founders and funds how to think.', art: 'terrace', focus: '58% 54%', accent: '#c8a25a' },
  { category: 'WORLDVIEW', description: 'Grand theses on technology, society and the future.', art: 'temple', focus: '45% 62%', accent: '#7b98b6' },
  { category: 'MACRO_MEMO', description: 'Letters from investors reading the cycle.', art: 'terrace', focus: '40% 86%', accent: '#c8a25a' },
  { category: 'SECTOR_REPORT', description: 'Annual maps of whole industries.', art: 'terrace', focus: '74% 50%', accent: '#8b8a52' },
  { category: 'SHORT_ACTIVIST', description: 'Reports that exposed frauds and toppled stocks.', art: 'temple', focus: '30% 86%', accent: '#b8693f' },
  { category: 'PITCH_DECK', description: 'The decks that raised the very first dollars.', art: 'terrace', focus: '92% 28%', accent: '#e6cc8f' },
  { category: 'CRYPTO', description: 'Documents of the crypto economy.', art: 'temple', focus: '70% 28%', accent: '#c8a25a' },
]

export function galleryOf(category: Category): Gallery {
  return GALLERIES.find((g) => g.category === category) ?? GALLERIES[0]
}
