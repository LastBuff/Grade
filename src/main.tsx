import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
/* import App from './App.tsx' */
import Grade from './component/Grade.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Grade />
  </StrictMode>,
)
