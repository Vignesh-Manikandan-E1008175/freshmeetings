import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'

const rootEle = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>
, rootEle)
