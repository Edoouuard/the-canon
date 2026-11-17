import { useSyncExternalStore } from 'react'

/** Tiny persisted store. localStorage can be unavailable (private mode, sandboxed frames), so every access is guarded. */
export function createStore<T>(key: string, initial: T) {
  let state: T = initial
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) state = { ...initial, ...JSON.parse(raw) }
  } catch {
    /* storage unavailable: keep in memory */
  }
  const listeners = new Set<() => void>()
  return {
    get: () => state,
    set(next: T | ((prev: T) => T)) {
      state = typeof next === 'function' ? (next as (p: T) => T)(state) : next
      try {
        window.localStorage.setItem(key, JSON.stringify(state))
      } catch {
        /* ignore */
      }
      listeners.forEach((l) => l())
    },
    subscribe(l: () => void) {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}

export function useStore<T>(store: ReturnType<typeof createStore<T>>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get)
}
