import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './popup/App'
import { ColorProvider } from './constants/ColorProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorProvider>
      <App />
    </ColorProvider>
  </React.StrictMode>,
)