import React, { useState, useEffect } from 'react';import { Link } from 'react-router-dom';
import { ChooseCurrency } from '../components/Currency';
import { Currencies } from '../components/CurrencyInfo';

import { IconContext } from 'react-icons';
import { FaArrowLeft } from "react-icons/fa";

const NavbarSearch = ()=> {
  const [index, setIndex ] = useState([]);

  // Get 'index' state from Currencies name & longName
  useEffect(()=> {
    const name= Currencies.map(i=>i.name);
    const longName= Currencies.map(i=>i.longName);

    setIndex([...name, ...longName]);
  }, [])

  // Search Box
  const handleChange= (event)=> {
    const value= event.target.value;
    const li= document.querySelectorAll('.currency-search');

    // Devide currency 'index' to included and not included the search result  
    let notIncluded= [];
    let included= [];

    index.forEach((item)=> {
      if(value === '') {
        included= index;
      } else if (!item.toLowerCase().includes(value.toLowerCase()) && notIncluded.indexOf(item)=== -1) {
        notIncluded= [...notIncluded, item];  
        included.filter((i) => (i !== item));
      } else if (item.toLowerCase().includes(value.toLowerCase()) && included.indexOf(item)=== -1) {
        included= [...included, item];
        notIncluded.filter((i) => (i !== item));
      };
    });
    
    // Give 'd-none' class to currency list if notIncluded, and remove it if included
    li.forEach((i)=> {
      const short= i.dataset.short;
      const long= i.dataset.long;

      if (included.includes(short) || included.includes(long)) {
        i.classList.remove('d-none');
      } else if (notIncluded.includes(short) || notIncluded.includes(long)) {
        i.classList.add('d-none');
      };
    });
  };

  const handleSubmit= (event)=> {
    event.preventDefault();
  };

  return (
    <nav className='navbar border-bottom shadow-sm'>
      <div className="container-fluid">
        <IconContext.Provider value={{ size: '20px' }} className='col-2'>
          <Link to='/'>
            <button className='btn'><FaArrowLeft /></button>
          </Link> 
        </IconContext.Provider> 
        <form className='col-10' onSubmit={ handleSubmit }>     
          <input type='search' placeholder='Search Currency' aria-label='Search' className='form-control border-0' onChange={ handleChange }></input>
        </form>
      </div>
    </nav>
  );
 
};

export default function Search() {
  return (
    <>
      <NavbarSearch />
      <div className='container'>
        <ul className='my-4 p-0'>
          <ChooseCurrency />
        </ul>
      </div>  
    </>
  );
};