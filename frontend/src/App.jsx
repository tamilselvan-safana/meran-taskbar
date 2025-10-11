import { Routes, Route } from 'react-router-dom';
import React from 'react'
import Home from './pages/home.jsx';
import Create from './pages/create.jsx';
import Detail from './pages/detail.jsx';
import Edit from './pages/edit.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
  <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
  )
}

export default App
