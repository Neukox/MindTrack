import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'sonner'
import { HelmetProvider } from "react-helmet-async";

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    <Toaster />
  </BrowserRouter>
)
