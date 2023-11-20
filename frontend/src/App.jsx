import { useState } from 'react'

import './App.css';
import axios from 'axios';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import Uploads from './component/uploads';
import Download from './component/download';
import Navbar from './component/navbar';
import Main from './component/main';

function App() {
  return(
    <Router>
    <Navbar/>

    <Routes>
    <Route path='/' element={<Main/>}/>
    <Route path='/download' element={<Main/>}/>
    </Routes>
    </Router>
  )
}

export default App
