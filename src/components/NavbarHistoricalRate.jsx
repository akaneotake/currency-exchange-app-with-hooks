import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaArrowLeft, FaBalanceScale } from "react-icons/fa";

const NavbarHistoricalRate= ()=> {
  return (
    <nav className='navbar navbar-orange border-bottom shadow-sm'>
      <div className="container-fluid">
        <IconContext.Provider value={{ size: '20px' }}>
          <Link to='/'>
            <button className='btn'><FaArrowLeft /></button>
          </Link> 
        </IconContext.Provider>
        <Link to='/' className='navbar-brand mx-auto'>
          <h5 className='mb-0 site-name'><FaBalanceScale /> HOW MUCH in...</h5>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarHistoricalRate;