import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { LazyMotion, domAnimation } from 'motion/react'
import '@fontsource-variable/geist'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './styles/index.css'
import { queryClient } from './lib/api.ts'
import { App } from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LazyMotion features={domAnimation} strict>
          <App />
        </LazyMotion>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
