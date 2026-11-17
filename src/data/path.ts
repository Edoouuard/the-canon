import { documents } from './documents'
import { richContent } from './richContent'
import { GALLERIES } from './galleries'
import type { DocMeta } from '../types'

const chrono = (a: DocMeta, b: DocMeta) => a.year - b.year || (a.date ?? '').localeCompare(b.date ?? '') || a.title.localeCompare(b.title)

/** The learning path: one unit per gallery, lessons in chronological order. */
export const PATH_UNITS = GALLERIES.map((g) => ({
  gallery: g,
  lessons: documents.filter((d) => d.category === g.category && richContent[d.slug]).sort(chrono),
})).filter((u) => u.lessons.length > 0)

export const PATH_ORDER = PATH_UNITS.flatMap((u) => u.lessons.map((d) => d.slug))

export function nextInPath(slug: string) {
  const i = PATH_ORDER.indexOf(slug)
  return i >= 0 && i < PATH_ORDER.length - 1 ? PATH_ORDER[i + 1] : undefined
}
