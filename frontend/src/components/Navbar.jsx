import { Fragment, useRef, useState } from "react"
import Logo from "../assets/logo1.png";
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch, AiOutlineArrowLeft } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Navbar = ({ openMenu, handleOpenMenu }) => {
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const commonMenuCss = "bg-brown h-[0.2rem] block w-[30px] transition ease transform duration-300";
  const screenWidth = useRef(window.innerWidth);
  console.log(screenWidth);
  return (
    <Fragment>
      <header>
        <div className="bg-dull-pink text-brown shadow-md">
          {
            openMobileSearch ?
              <nav className="w-full m-0 p-0">
                <form className="flex flex-col items-center relative">
                  <button className="absolute top-5 left-2">
                    <AiOutlineArrowLeft size={20} />
                  </button>
                  <input type="search" placeholder="Search for products, brands, and more" className="bg-dull-pink placeholder:text-brown placeholder:text-ellipse grid w-full h-[60px] px-9 pe-12 py-[5px] rounded-md focus:outline-none" />
                  {/* <div className="absolute top-1.5 right-9 ">
                    <AiOutlineClose  size={20} />
                  </div> */}
                  <button className="absolute top-5 right-5 ms-5">
                    <AiOutlineSearch  size={20} />
                  </button>
                </form>
              </nav> :

              <nav className="flex justify-around content-center items-center px-5 py-2">
                <button className="grid gap-y-1 sm:hidden" onClick={() => handleOpenMenu(!openMenu)}>
                  <span className={`${commonMenuCss} ${openMenu && "translate-y-[5px] rotate-45"}`}>

                  </span>
                  <span className={`${commonMenuCss} ${openMenu && "opacity-0"}`}>

                  </span>
                  <span className={`${commonMenuCss} ${openMenu && "-translate-y-[9px] -rotate-45"}`}>

                  </span>
                </button>
                <Link className="max-w-[150px] min-w-[50px]" to="/">
                  <img src={Logo} alt="Efashionia" />
                </Link>

                <div className="justify-center gap-5 lg:gap-10 px-3 hidden md:flex">
                  <Link to="/men" className="hover:opacity-50">
                    <div>Men</div>
                  </Link>
                  <Link to="/women"  className="hover:opacity-50">
                    <div>Women</div>
                  </Link>
                  <Link to="/kids"  className="hover:opacity-50">
                    <div>Kids</div>
                  </Link>
                  <Link to="/beauty" className="hover:opacity-50">
                    <div>Beauty</div>
                  </Link>
                </div>
                <div className="flex justify-center content-center gap-3">
                  <form className="flex flex-col items-center sm:relative sm:grid sm:ps-2 sm:pe-3">
                    <div className="sm:absolute sm:top-3 sm:left-4">
                      {
                        screenWidth.current < 640 ? <button onClick={() => setOpenMobileSearch(true)}>
                          <AiOutlineSearch size={20} />
                        </button> :
                          <AiOutlineSearch size={20} />

                      }
                    </div>
                    <input type="search" placeholder="Search for products, brands, and more" className="hidden sm:grid sm:w-[350px] sm:px-3 sm:ps-9 sm:py-[5px] sm:rounded-md focus:outline-none" />
                  </form>
                  <Link to="/profile" className="hover:opacity-50">
                    <div className="flex flex-col items-center">
                      <div>
                        <AiOutlineUser size={20} />
                      </div>
                      <div className="hidden sm:block">Profile</div>
                    </div>
                  </Link>
                  <Link to="/wishlist"  className="hover:opacity-50">
                    <div className="flex flex-col  items-center">
                      <div>
                        <AiOutlineHeart size={20} />
                      </div>
                      <div className="hidden sm:block">Wishlist</div>
                    </div>
                  </Link>
                  <Link to="/bag" className="hover:opacity-50">
                    <div className="flex flex-col items-center">
                      <div>
                        <BsBag size={20} />
                      </div>
                      <div className="hidden sm:block">Bag</div>
                    </div>
                  </Link>
                </div>
              </nav>
          }
        </div>
      </header>
    </Fragment>
  )
}
Navbar.propTypes = {
  openMenu: PropTypes.node.isRequired,
  handleOpenMenu: PropTypes.node.isRequired,
};