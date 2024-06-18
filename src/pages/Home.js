import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Currency } from '../components/Currency';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';

const NavbarHome= ()=> {
  return (
    <nav className='navbar navbar-orange border-bottom shadow-sm'>
      <div className="container-fluid">
        <Link to='/' className='navbar-brand mx-auto'>
          <h5 className='mb-0 site-name'><FaBalanceScale /> HOW MUCH in...</h5>
        </Link>
        <IconContext.Provider value={{ size: '20px' }}>
          <Link to='/search'>
            <button className='btn'><FaPlus /></button>
          </Link>
        </IconContext.Provider>
      </div>
    </nav>
  );
};
   
export default function Home() {
  const [ date, setDate ] = useState('');

  useEffect(()=> {
    fetch('https://api.frankfurter.app/latest')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      setDate(data.date)
    }).catch(error => console.log('Error!: ', error))
  }, []);

  return (      
    <React.Fragment>
      <NavbarHome />
      <div className='container'>
        <h6 className='text-center my-2'>
          Latest Update: { date }
        </h6>
        <ul className='my-4 p-0'>
          <Currency />
        </ul>
      </div>
    </React.Fragment>
  );
};