import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
  <AuthProvider>
      <App />
  </AuthProvider>
  </StrictMode>
  </BrowserRouter>,
)
