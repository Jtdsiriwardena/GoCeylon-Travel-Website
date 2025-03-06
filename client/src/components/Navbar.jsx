
import { FaLanguage, FaDollarSign, FaUserAlt } from 'react-icons/fa';

const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-4xl  text-black tracking-wide">
          GO<span className="font-bold">CEYLON.</span>
        </h1>

        {/* Desktop Menu */}
        <div className="flex-1 flex justify-center font-semibold">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#home"
                className="px-6 py-3 text-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out "
              >
                HOME
              </a>
            </li>
            <li
            >
              <a
                href="#explore"
                className="px-6 py-3 text-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out "
              >
                EXPLORE
              </a>
              
            </li>
            
            <li>
              <a
                href="#plan"
                className="px-6 py-3 text-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out "
              >
                PLAN YOUR TRIP
              </a>
              </li> 
           
            <li>
              <a
                href="#community"
                className="px-6 py-3 text-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out "
              >
                COMMUNITY
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="px-6 py-3 text-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out "
              >
                ABOUT
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side Icons (Language, Currency, Login) */}
        <div className="flex items-center space-x-6">
          <a
            href="#language"
            className="text-black p-3 hover:bg-black hover:text-white transition-all duration-300 "
          >
            <FaLanguage size={20} />
          </a>
          <a
            href="#currency"
            className="text-black p-3 hover:bg-black hover:text-white transition-all duration-300 "
          >
            <FaDollarSign size={20} />
          </a>
          <a
            href="#login"
            className="text-black p-3 hover:bg-black hover:text-white transition-all duration-300"
          >
            <FaUserAlt size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
