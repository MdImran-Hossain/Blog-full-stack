import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singup from './pages/Singup'
import Singin from './pages/Singin'
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import BlogEdite from './pages/BlogEdite';

const App = () => {
  return (
     <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<Singup />} />
      <Route path="/singin" element={<Singin />} />
      <Route path="/" element={<Blog />} />
      <Route path="/blogdetails/:id" element={<BlogDetails />} />
      <Route path="/blogedite/:id" element={<BlogEdite />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App