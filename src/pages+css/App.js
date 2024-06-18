import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../pages+css/Home';
import Search from '../pages+css/Search';
import HistoricalRate from './HistoricalRate';
import './App.css';

const Footer = () => {
  return (
    <div className='border-top text-secondary px-5 py-2'>
      Build by <a target='_blank' href='https://akaneotake-portfolio.netlify.app'>Akane Otake</a>
      <span className='float-end'>favicon by <a target='_blank' href='https://icons8.com'>Icons8</a></span>
    </div>
  );
};

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