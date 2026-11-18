import { documents } from './documents'
import { richContent } from './richContent'
import type { DocMeta } from '../types'
import type { ART } from './galleries'

/**
 * The learning path is a curated curriculum, not the gallery list.
 * Chapters go from foundations to the frontier, and within a chapter each lesson
 * builds on the previous one (usually in chronological order).
 */
export interface Chapter {
  id: string
  title: string
  intro: string
  art: keyof typeof ART
  focus: string
  slugs: string[]
}

const CHAPTERS_RAW: Chapter[] = [
  {
    id: 'foundations',
    title: 'Bits, chips and the web',
    intro: 'Start where the digital economy started: the theory of information, the first chip company, and the proposals that created the web and search.',
    art: 'terrace',
    focus: '50% 20%',
    slugs: ['shannon-communication-theory', 'fairchild-founding', 'dec-proposal', 'www-proposal', 'internet-tidal-wave', 'meeker-internet-trends', 'increasing-returns', 'pagerank'],
  },
  {
    id: 'startups',
    title: 'How startups are born',
    intro: 'Before money, there is an idea and a few users. These essays explain how founders find ideas, test them cheaply and build something people want.',
    art: 'terrace',
    focus: '60% 55%',
    slugs: ['tesla-master-plan', '1000-true-fans', 'next-big-thing-toy', 'lean-startup', 'how-to-get-startup-ideas', 'do-things-that-dont-scale', 'competition-is-for-losers', 'zero-to-one', 'blitzscaling'],
  },
  {
    id: 'pitch',
    title: 'The first pitch',
    intro: 'Real documents founders used to raise their first money. Read them after the startup chapter: you will recognise every principle in action.',
    art: 'temple',
    focus: '30% 60%',
    slugs: ['facebook-media-kit', 'youtube-investment-memo', 'ubercab-pitch-deck', 'airbnb-pitch-deck'],
  },
  {
    id: 'venture',
    title: 'How venture capital thinks',
    intro: 'Why software wins, where moats come from, how to size a market and what investors look for, ending with how the venture industry itself is changing.',
    art: 'terrace',
    focus: '75% 45%',
    slugs: ['rip-good-times', 'why-software-is-eating-the-world', 'what-happened-to-the-future', 'tam-note-to-self', 'saas-metrics-2', 'opencloud-report', 'mobile-is-eating-the-world', 'aggregation-theory', 'the-new-moats', 'ark-big-ideas', 'invisible-asymptotes', 'solo-capitalists', 'adapting-to-endure', 'mcdonaldization-of-vc'],
  },
  {
    id: 'cycles',
    title: 'Reading the market cycle',
    intro: 'How great investors price risk and behave in booms and busts, from option pricing to debt cycles and the shifting world order.',
    art: 'temple',
    focus: '50% 40%',
    slugs: ['black-scholes', 'superinvestors-graham-doddsville', 'race-to-the-bottom', 'buy-american', 'reinvesting-when-terrified', 'big-debt-crises', 'changing-world-order', 'fraying-reserve-system', 'spac-letters', 'waiting-for-the-last-dance', 'sea-change', 'bretton-woods-iii'],
  },
  {
    id: 'shorts',
    title: 'Short sellers and frauds',
    intro: 'The other side of the market: investigators who spotted frauds and bubbles before everyone else, and how they built their case.',
    art: 'temple',
    focus: '25% 85%',
    slugs: ['enron-short-thesis', 'allied-capital-short', 'madoff-fraud-report', 'scion-subprime-short', 'lehman-short-thesis', 'sino-forest-report', 'herbalife-short', 'valeant-report', 'luckin-coffee-report', 'nikola-report', 'adani-report'],
  },
  {
    id: 'crypto',
    title: 'Money on the internet',
    intro: 'From the Bitcoin white paper to smart contracts and automated markets: the founding documents of crypto, in the order they built on each other.',
    art: 'terrace',
    focus: '90% 30%',
    slugs: ['sovereign-individual', 'bitcoin-whitepaper', 'ethereum-whitepaper', 'fat-protocols', 'solana-whitepaper', 'bullish-case-bitcoin', 'why-decentralization-matters', 'uniswap-whitepaper'],
  },
  {
    id: 'deep-learning',
    title: 'The deep learning revolution',
    intro: 'How neural networks went from recognising images to writing text: the key papers, then the scaling laws that turned them into large language models.',
    art: 'temple',
    focus: '55% 35%',
    slugs: ['alexnet', 'word2vec', 'resnet', 'attention-is-all-you-need', 'software-2-0', 'the-bitter-lesson', 'scaling-laws', 'scaling-hypothesis', 'gpt-3', 'chinchilla', 'deepseek-r1', 'inkling-open-weights', 'gemini-4-carbon', 'pragma-revolut'],
  },
  {
    id: 'visions',
    title: 'Visions of the AI future',
    intro: 'Optimists, pessimists and long-termists: the essays that frame the big debate about what powerful AI will do to the world.',
    art: 'temple',
    focus: '12% 42%',
    slugs: ['superintelligence', 'meditations-on-moloch', 'new-science-of-progress', 'most-important-century', 'moores-law-for-everything', 'what-we-owe-the-future', 'agi-ruin', 'why-ai-will-save-the-world', 'techno-optimist-manifesto', 'machines-of-loving-grace', 'situational-awareness'],
  },
  {
    id: 'ai-economy',
    title: 'AI in the economy',
    intro: 'What AI is actually doing to companies, jobs and markets, from investor decks to field experiments and the 2026 state of the field.',
    art: 'terrace',
    focus: '40% 85%',
    slugs: ['meeker-ai-trends', 'block-intelligence-native', 'ai-enhance-or-erode-expertise', 'state-of-ai-2026', 'ai100-ai-goes-mainstream', 'layman-thinks-about-ai', 'forrester-ai-scaling-problem'],
  },
  {
    id: 'safety',
    title: 'The pace of the frontier',
    intro: 'In 2026, AI started helping build AI. These works measure how fast that is happening and argue about whether to slow it down.',
    art: 'temple',
    focus: '86% 56%',
    slugs: ['automated-alignment-researchers', 'we-must-pace-the-frontier', 'measuring-pace-ai-development', 'how-close-is-rsi'],
  },
  {
    id: 'cyber',
    title: 'AI meets cybersecurity',
    intro: 'Models that find and exploit bugs, attackers who automate, and defenders who answer with mathematical proofs.',
    art: 'terrace',
    focus: '14% 52%',
    slugs: ['llm-formal-verification', 'cyberlens-saes', 'gpt-6-cyber', 'alphaproof-code', 'gtig-ai-threat-tracker-q4-2026'],
  },
  {
    id: 'science',
    title: 'AI for science',
    intro: 'AI turned toward mathematics and biology, and a warning about what breakthroughs do to the attention of a whole field.',
    art: 'terrace',
    focus: '86% 72%',
    slugs: ['openai-math-release', 'breakthroughs-hasten-exhaustion', 'alphagenome-2'],
  },
  {
    id: 'light',
    title: 'Computing with light',
    intro: 'First the big picture of photonic computing and where it can matter, then three lab advances, then the industry that will make it.',
    art: 'temple',
    focus: '88% 40%',
    slugs: ['photonic-accelerators-cloud-edge', 'nanophotonics-practical-optical-computing', 'photonic-concurrent-computing-engine', 'microring-temporal-kernels', 'photonic-in-situ-learning', 'silicon-photonics-market-2026-2036'],
  },
]

const bySlug = new Map(documents.map((d) => [d.slug, d]))

/** Only works with full annotations can be lessons; anything annotated but not curated goes to a final chapter. */
const curated = CHAPTERS_RAW.map((c) => ({
  ...c,
  lessons: c.slugs.map((s) => bySlug.get(s)).filter((d): d is DocMeta => !!d && !!richContent[d.slug]),
}))
const used = new Set(curated.flatMap((c) => c.lessons.map((d) => d.slug)))
const rest = documents.filter((d) => richContent[d.slug] && !used.has(d.slug))

export const CHAPTERS = [
  ...curated,
  ...(rest.length
    ? [{ id: 'more', title: 'Further reading', intro: 'Other annotated works from the collection.', art: 'terrace' as const, focus: '50% 50%', slugs: rest.map((d) => d.slug), lessons: rest }]
    : []),
].filter((c) => c.lessons.length > 0)

export const PATH_ORDER = CHAPTERS.flatMap((c) => c.lessons.map((d) => d.slug))

export function chapterOf(slug: string) {
  return CHAPTERS.find((c) => c.lessons.some((d) => d.slug === slug))
}

export function nextInPath(slug: string) {
  const i = PATH_ORDER.indexOf(slug)
  return i >= 0 && i < PATH_ORDER.length - 1 ? PATH_ORDER[i + 1] : undefined
}
