import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import currencies from './currencyInfo';
import { handleDragStart, handleDragEnter, handleDragOver, handleDragLeave, handleDragEnd, handleDrop } from './draggingList';

import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

// Grobal variable to store the checked list & use them in Currency, ChooseCurrency and Search classes.
let listToHome= ['EUR', 'USD', 'JPY'];

// Insert the list of currency in Home page
export const Currency = ()=> {
  const [ base, setBase ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [rates, setRates ] = useState([]);

  useEffect(()=> {
    toChart(base);
  }, []);

  const toChart= (base)=> {
    const chart= document.querySelectorAll('.to-historical-rate');

    chart.forEach(i=> {
      if (!base) {
        i.classList.add('d-none');
      } else if (base == i.getAttribute('name')) {
        i.classList.add('d-none');
      } else {
        i.classList.remove('d-none');
      }
    });
  }

  const getBase= (event)=> {
    setBase(event.target.name);
    setAmount('');
  }

  const getRates= ()=> {
    toChart(base);
   
    fetch(`https://api.frankfurter.app/latest?from=${ base }`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      const ratesData= Object.keys(data.rates)
      .filter(i=> i !== base)
      .map(i=> ({
        [i]: data.rates[i],
      }))
      setRates(ratesData);
    }).catch(error => console.log('Error!: ', error))
  };

  const getAmount= (event)=> {
    setAmount(event.target.value);
  };

  const getValue= (name)=> {
    if (!amount) {
      return '';
    } else if (base === name) {
      return amount;
    } else {
      const rate= Object.values(rates.find(i=> i[name]));
      return (rate * amount).toFixed(2);
    };
  };

  const handleSubmit= (event)=> {
    event.preventDefault();
  };

  // Trush bin function
  const deleteCurrency= (event)=> {
    const name= event.currentTarget.name;
    const element= document.querySelector(`#${name}`);

    element.classList.add('d-none');        
    listToHome= listToHome.filter((item) => (item !== name));
  };

  return currencies.map(({ name, longName, image })=> {
    // Unshown the currency which is not chosen in Search page
    const display= listToHome.includes(name)? '' : 'd-none';
    const classes= `currency-home row my-1 px-2 mx-lg-5 ${display}`;

    return( 
      <li id={ name } key={ name } className={ classes } onDragStart={ handleDragStart } onDragEnter={ handleDragEnter } onDragOver={ handleDragOver } onDragLeave={ handleDragLeave } onDragEnd={handleDragEnd} onDrop={ handleDrop }>
        <img className='col-2 flag p-0' src={ image } alt={ longName } draggable='false'></img>
        <div className='col-2 my-auto p-0 text-center'>
          <span className='short-name'>{ name }</span>
          <Link to='/search'><GoTriangleDown /></Link>
        </div>
        <form className='col-5 p-0' autoComplete="off" onSubmit={ handleSubmit }>
          <input className='h-100 w-100 text-end input-home no-spin' type='number' step='1' name={ name } value={ getValue(name) } onFocus={ getBase } onClick={ getRates } onInput={ getAmount }></input>
        </form>
        <div className='col-1'>
          <Link to={`/historical-rate?base=${base}&quote=${name}`} className='to-historical-rate mt-1' name={ name }><BsGraphUpArrow /></Link>
        </div>
        <button type='button' className='btn col-1 m-auto dnd' draggable='true'><IoReorderTwoOutline /></button>
        <button type='button' name={ name } className='btn col-1' onClick={ deleteCurrency }><FaRegTrashAlt /></button>
      </li>
    );
  });
};

// Insert the list of currency in Search page
export const ChooseCurrency = ()=> {
  const handleClick= (event)=> {
    const currency = event.target.name;

    if (event.target.checked && !listToHome.includes(currency)) {
      listToHome= [...listToHome, currency];
    } else if (!event.target.checked && listToHome.includes(currency)) {
      listToHome= listToHome.filter((i) => (i !== currency));
    };
  };

  return currencies.map(({ name, longName, image })=> {
    // Check the checkbox
    const checked= listToHome.includes(name)? 'checked' : '';

    return(
      <li className='currency-search row my-2 mx-lg-5' key={ name } data-short={ name } data-long={ longName }>
        <input className='checkbox col-2' type='checkbox' defaultChecked={ checked } name={ name } onClick={ handleClick }></input>
        <img className='col-2 flag' src={ image } alt={ longName }></img>
        <div className='col-8 currency-name'>
          <p className='short-name'>{ name }</p>
          <p className='long-name'>{ longName }</p>
        </div>
      </li>
    );
  });
}; 