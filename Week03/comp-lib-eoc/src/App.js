import {Routes, Route} from 'react-router-dom'

import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import ModalPage from './pages/ModalPage'
import NavBar from './components/NavBar'

// IMPORTANT path here does not take a / before the route name
export default function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <NavBar />
      <div className="col-span-5 relative">
        <Routes>
          <Route path="/" element={<ButtonPage />} />
          <Route path="accordion" element={<AccordionPage />} />
          <Route path="modal" element={<ModalPage />} />
        </Routes>
      </div>
    </div>
  )
}
