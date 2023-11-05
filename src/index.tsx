import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const rootEle = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootEle).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
