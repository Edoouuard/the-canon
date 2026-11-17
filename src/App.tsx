import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Directory from './pages/Directory'
import DocumentDetail from './pages/DocumentDetail'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <ScrollProgress />
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
