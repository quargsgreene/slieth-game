import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lose from './pages/Lose.jsx'
import Win from './pages/Win.jsx'
import './index.css'
import App from './App.jsx'
import About from './pages/About.jsx'
import Help from './pages/Help.jsx'
import NavBar from './components/NavBar.jsx'
import CurrentGameStatus from './pages/CurrentGameStatus.jsx'
import GameNodeViewPage from './pages/GameNodeViewPage.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/status" element={<CurrentGameStatus />} />
            <Route path="/game" element={<GameNodeViewPage />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
            <Route path="/lose" element={<Lose />} />
            <Route path="/win" element={<Win />} />
        </Routes>
    </BrowserRouter>
)