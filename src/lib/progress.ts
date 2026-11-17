import { createStore, useStore } from './store'

export interface QuizRecord {
  best: number
  total: number
  points: number
  at: number
}

type Progress = { records: Record<string, QuizRecord> }

export const progressStore = createStore<Progress>('canon.progress.v1', { records: {} })

export function recordQuiz(slug: string, score: number, total: number, points: number) {
  progressStore.set((p) => {
    const prev = p.records[slug]
    const best = Math.max(prev?.best ?? 0, score)
    return {
      records: {
        ...p.records,
        [slug]: { best, total, points: Math.max(prev?.points ?? 0, points), at: Date.now() },
      },
    }
  })
}

/** A work is "laurelled" once at least two thirds of its examination has been answered correctly. */
export function isLaurelled(r?: QuizRecord) {
  return !!r && r.best / r.total >= 2 / 3
}

export function useProgress() {
  return useStore(progressStore)
}
