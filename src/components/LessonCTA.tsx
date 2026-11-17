import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, ListOrdered, Shuffle, CircleHelp, Zap } from 'lucide-react'
import { useGame } from '../lib/game'
import { StarRow, Flame } from './game'
import { Laurel } from './immersive'

export default function LessonCTA({ slug }: { slug: string }) {
  const g = useGame()
  const rec = g.lessons[slug]
  return (
    <div className="plate relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,90,0.2),transparent_60%)]" aria-hidden />
      <div className="relative p-7 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Laurel size={40} tone={rec ? (rec.stars === 3 ? 'gold' : rec.stars === 2 ? 'silver' : 'bronze') : 'gold'} className={rec ? '' : 'opacity-60'} />
            {rec ? (
              <div>
                <StarRow stars={rec.stars} size={18} />
                <p className="caps text-[0.52rem] text-parchment/50 mt-1">
                  Completed {rec.completions} time{rec.completions > 1 ? 's' : ''} · best accuracy {Math.round(rec.bestAccuracy * 100)}%
                </p>
              </div>
            ) : (
              <p className="caps text-[0.58rem] text-gold">New lesson</p>
            )}
          </div>
          <h3 className="display text-3xl md:text-4xl text-parchment leading-tight">{rec ? 'Practise this work again' : 'Turn this reading into memory'}</h3>
          <ul className="mt-5 grid sm:grid-cols-3 gap-3 text-[0.92rem] text-parchment/70">
            <li className="flex items-center gap-2">
              <CircleHelp size={15} className="text-gold" /> 3 questions
            </li>
            <li className="flex items-center gap-2">
              <Shuffle size={15} className="text-gold" /> Match the figures
            </li>
            <li className="flex items-center gap-2">
              <ListOrdered size={15} className="text-gold" /> Rebuild the steps
            </li>
          </ul>
          <p className="flex items-center gap-4 mt-4 caps text-[0.55rem] text-parchment/50">
            <span className="flex items-center gap-1.5">
              <Heart size={12} className="text-terracotta fill-terracotta" /> 3 hearts
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={12} className="text-gold-light fill-gold-light" /> up to +{rec ? 18 : 23} XP
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={13} /> keeps your streak
            </span>
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link to={`/lesson/${slug}`} className="btn-gilt text-[0.8rem] px-8 py-5 w-full justify-center">
            {rec ? 'Practise' : 'Start lesson'} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
