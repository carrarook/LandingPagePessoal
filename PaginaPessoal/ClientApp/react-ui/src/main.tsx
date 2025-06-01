import { StrictMode } from 'react'
import React from 'react' // Adicionando a importação do React
import { createRoot } from 'react-dom/client'
import './index.css' // Removida duplicada
import App from './App.tsx'
import HeroSection from './HeroSection'

// Primeiro componente root
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)

// Segundo componente root
createRoot(document.getElementById('hero-root')!).render(
    <React.StrictMode>
        <HeroSection />
    </React.StrictMode>,
)