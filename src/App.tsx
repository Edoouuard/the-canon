import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Directory from './pages/Directory'
import DocumentDetail from './pages/DocumentDetail'
import Lesson from './pages/Lesson'
import Path from './pages/Path'
import Profile from './pages/Profile'
import Watch from './pages/Watch'
import { GameToasts } from './components/game'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import { EntryVeil } from './components/immersive'
import { resumeAmbienceOnGesture } from './lib/sound'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    resumeAmbienceOnGesture()
  }, [])

  return (
    <>
      <EntryVeil />
      <ScrollProgress />
      <GameToasts />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/directory"
            element={
              <PageTransition>
                <Directory />
              </PageTransition>
            }
          />
          <Route
            path="/path"
            element={
              <PageTransition>
                <Path />
              </PageTransition>
            }
          />
          <Route
            path="/watch"
            element={
              <PageTransition>
                <Watch />
              </PageTransition>
            }
          />
          <Route
            path="/profile"
            element={
              <PageTransition>
                <Profile />
              </PageTransition>
            }
          />
          <Route
            path="/lesson/:slug"
            element={
              <PageTransition>
                <Lesson />
              </PageTransition>
            }
          />
          <Route
            path="/doc/:slug"
            element={
              <PageTransition>
                <DocumentDetail />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}
