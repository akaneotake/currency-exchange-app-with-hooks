import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    <Router>
      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/search' component={ Search } />
        <Route path='/historical-rate' component={ HistoricalRate } />
        <Route render={()=> <h1 className='text-center py-3'>404 Not Found</h1>} />
      </Switch>
      <Footer />
    </Router>
  );
};