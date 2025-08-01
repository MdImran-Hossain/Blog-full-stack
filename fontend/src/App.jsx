import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singup from './pages/Singup'
import Singin from './pages/Singin'
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';

const App = () => {
  return (
     <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<Singup />} />
      <Route path="/singin" element={<Singin />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blogdetails/:id" element={<BlogDetails />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App