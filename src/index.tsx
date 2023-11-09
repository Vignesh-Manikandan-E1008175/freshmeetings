import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import AppProvider from './AppProvider.tsx';

const rootEle = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
, rootEle)
