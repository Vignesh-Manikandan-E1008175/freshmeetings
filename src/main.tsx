import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

const rootEle = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootEle).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
