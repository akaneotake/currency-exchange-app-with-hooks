import { Link } from 'react-router-dom';
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

export default NavbarHome;