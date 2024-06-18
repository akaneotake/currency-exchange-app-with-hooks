import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from './components/Footer'
import Home from './pages/Home';
import Search from './pages/Search';
import HistoricalRate from './pages/HistoricalRate';
import './App.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='search' element={<Search />} />
        <Route path='historical-rate' element={<HistoricalRate />} />
        <Route render={()=> <h1 className='text-center py-3'>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};