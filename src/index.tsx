import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

const rootEle = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootEle)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
