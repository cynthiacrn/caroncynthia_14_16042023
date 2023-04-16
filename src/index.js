import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NewEmployee from "./pages/NewEmployee"
import ListEmployee from "./pages/ListEmployee"
import StoreProvider from "./store";
import './index.css'

function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NewEmployee />} />
          <Route path="/employee-list" element={<ListEmployee />} />
        </Routes>
      </Router>
    </StoreProvider>
  )
}

createRoot(document.getElementById('root')).render(<App />);

