import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Directory from './pages/Directory'
import DocumentDetail from './pages/DocumentDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/doc/:slug" element={<DocumentDetail />} />
    </Routes>
  )
}
