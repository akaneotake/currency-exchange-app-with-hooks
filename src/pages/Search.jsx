import React from 'react';
import NavbarSearch from '../components/NavbarSearch'
import { ChooseCurrency } from '../components/Currency';

const Search = ()=> {
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

export default Search;