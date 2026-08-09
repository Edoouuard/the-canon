import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import type { QuizQuestion } from '../types'

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
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="liquid-glass rounded-3xl p-8 md:p-10 overflow-hidden text-center"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}>
          <Trophy size={28} className="text-white/70 mx-auto mb-4" strokeWidth={1.5} />
        </motion.div>
        <p className="text-white/50 text-sm tracking-widest uppercase mb-2">Result</p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl text-white mb-6"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {score} / {questions.length}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={restart}
          className="liquid-glass rounded-full px-6 py-2.5 text-white text-sm font-medium overflow-hidden hover:bg-white/5 transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw size={14} />
          Play again
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Question {step + 1} of {questions.length}
        </span>
        <span className="text-white/40 text-xs">Score {score}</span>
      </div>

      <div className="h-1 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-white/60 rounded-full"
          animate={{ width: `${((step + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-white text-lg md:text-xl mb-6 tracking-tight leading-snug">{q.question}</h4>

          <div className="flex flex-col gap-3 mb-4">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex
              const isSelected = i === selected
              const revealed = selected !== null

              let stateClasses = 'border-white/10 hover:border-white/25'
              if (revealed && isCorrect) stateClasses = 'border-white/60 bg-white/[0.06]'
              else if (revealed && isSelected && !isCorrect) stateClasses = 'border-white/20 bg-white/[0.02] opacity-60'

              return (
                <motion.button
                  key={i}
                  whileHover={revealed ? {} : { x: 4 }}
                  whileTap={revealed ? {} : { scale: 0.98 }}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={`text-left rounded-xl border px-4 py-3 text-sm text-white/80 transition-all flex items-center justify-between gap-3 ${stateClasses}`}
                >
                  <span>{opt}</span>
                  {revealed && isCorrect && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                      <Check size={16} className="text-white shrink-0" />
                    </motion.span>
                  )}
                  {revealed && isSelected && !isCorrect && <X size={16} className="text-white/50 shrink-0" />}
                </motion.button>
              )
            })}
          </div>

          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <p className="text-white/50 text-sm leading-relaxed mb-5 pt-2">{q.explanation}</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={next}
                className="liquid-glass rounded-full px-6 py-2.5 text-white text-sm font-medium overflow-hidden hover:bg-white/5 transition-colors"
              >
                {step + 1 >= questions.length ? 'See result' : 'Next question'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
