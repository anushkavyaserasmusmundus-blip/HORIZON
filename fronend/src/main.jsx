import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TasksProvider } from './hooks/useTasks.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AuthProvider>
  </StrictMode>,
)
