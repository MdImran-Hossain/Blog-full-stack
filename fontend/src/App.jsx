import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singup from './pages/Singup'
import Singin from './pages/Singin'
import Blog from './pages/Blog';

const App = () => {
  return (
     <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<Singup />} />
      <Route path="/singin" element={<Singin />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App