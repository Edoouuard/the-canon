import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X, RotateCcw } from 'lucide-react'
import type { QuizQuestion } from '../types'
import { Ornament, roman } from './ui'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function verdict(score: number, total: number) {
  const r = score / total
  if (r === 1) return 'Summa cum laude'
  if (r >= 0.66) return 'Magna cum laude'
  if (r >= 0.34) return 'Cum laude'
  return 'Repetita iuvant'
}

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[step]

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correctIndex) setScore((s) => s + 1)
  }

  function next() {
    if (step + 1 >= questions.length) {
      setDone(true)
      return
    }
    setStep((s) => s + 1)
    setSelected(null)
  }

  function restart() {
    setStep(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="plate p-10 md:p-14 text-center">
        <p className="caps text-[0.6rem] text-gold mb-6">Your result</p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="display text-7xl text-gold-light leading-none"
        >
          {score}
          <span className="text-parchment/40 text-5xl"> / {questions.length}</span>
        </motion.p>
        <p className="display italic text-2xl text-parchment mt-5">{verdict(score, questions.length)}</p>
        <Ornament className="my-8" />
        <button onClick={restart} className="btn-ghost">
          <RotateCcw size={13} /> Sit the examination again
        </button>
      </motion.div>
    )
  }

  const revealed = selected !== null

  return (
    <div className="plate p-6 md:p-10">
      <div className="flex items-center justify-between mb-5">
        <span className="caps text-[0.6rem] text-gold">
          Question {roman(step + 1)} of {roman(questions.length)}
        </span>
        <div className="flex gap-1.5" aria-hidden>
          {questions.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rotate-45 transition-colors ${i < step || (i === step && revealed) ? 'bg-gold' : i === step ? 'bg-gold/40' : 'bg-parchment/15'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
          <h3 className="display text-2xl md:text-3xl text-parchment mb-7 leading-snug">{q.question}</h3>

          <div className="flex flex-col gap-3 mb-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex
              const isSelected = i === selected
              let state = 'border-gold/20 hover:border-gold/60 hover:bg-gold/[0.04]'
              if (revealed && isCorrect) state = 'border-gold-light bg-gold/[0.12]'
              else if (revealed && isSelected) state = 'border-terracotta/60 bg-terracotta/[0.08]'
              else if (revealed) state = 'border-gold/10 opacity-50'
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={`text-left border px-4 py-3.5 flex items-center gap-4 transition-all ${state}`}
                >
                  <span className={`caps text-[0.62rem] w-7 h-7 shrink-0 flex items-center justify-center border ${revealed && isCorrect ? 'border-gold-light text-gold-light' : 'border-gold/35 text-gold/80'}`}>
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-parchment/90 text-[1.02rem]">{opt}</span>
                  {revealed && isCorrect && <Check size={16} className="text-gold-light shrink-0" />}
                  {revealed && isSelected && !isCorrect && <X size={16} className="text-terracotta shrink-0" />}
                </button>
              )
            })}
          </div>

          {revealed && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
              <div className="mt-6 pt-6 border-t border-gold/20">
                <p className="caps text-[0.58rem] mb-2" style={{ color: selected === q.correctIndex ? 'var(--color-gold-light)' : 'var(--color-terracotta)' }}>
                  {selected === q.correctIndex ? 'Correct' : 'Not quite'}
                </p>
                <p className="text-parchment/75 leading-relaxed mb-6 italic">{q.explanation}</p>
                <button onClick={next} className="btn-gilt">
                  {step + 1 >= questions.length ? 'See the verdict' : 'Next question'}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
