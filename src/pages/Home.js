import React, { useState, useEffect } from 'react';
import NavbarHome from '../components/NavbarHome'
import { Currency } from '../components/Currency';
  
const Home = ()=> {
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
    <>
      <NavbarHome />
      <div className='container'>
        <h6 className='text-center my-2'>
          Latest Update: { date }
        </h6>
        <ul className='my-4 p-0'>
          <Currency />
        </ul>
      </div>
    </>
  );
};

export default Home;