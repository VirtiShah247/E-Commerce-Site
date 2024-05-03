import { Fragment, useCallback, useRef, useState } from "react"
import Logo from "../assets/logo.png";
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch, AiOutlineArrowLeft } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import { Button } from "../utils/Button";
import { ProfileItems } from "./ProfileItems";
import { MobileSidebar } from "./MobileSidebar";
import { useEffect } from "react";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const commonMenuCss = "bg-foreground-color h-[0.2rem] block w-[30px] transition ease transform duration-300";
  const screenWidth = useRef(window.innerWidth);
  const openMenuRef = useRef(openMenu);
  const handleMenu = useCallback(() => {
    setOpenMenu(openMenu => (!openMenu));
    openMenuRef.current = !openMenu;
  }, [openMenu])
  useEffect(()=>{
    if(openMenuRef.current){
    document.querySelector(".mainBody").classList.add("overlayBackground");
    }
    return()=>{
    document.querySelector(".mainBody").classList.remove("overlayBackground");
    }
  },[openMenu]);
  return (
    <Fragment>
      <header>
        <div className="fixed bg-base-color w-full shadow-md z-50">
          {
            openMobileSearch ?
              <nav className="w-full m-0 p-0 bg-base-color/70 shadow-2xl">
                <form className="flex flex-col items-center relative">
                  <Button color="baseColorButton" className="absolute top-5 left-2" onClick={() => window.location.reload()}>
                    <AiOutlineArrowLeft size={20} />
                  </Button>
                  <input type="search" placeholder="Search for products, brands, and more" className="bg-base-color placeholder:text-foreground-color placeholder:text-ellipse grid w-full h-[60px] px-9 pe-12 py-[5px] rounded-md focus:outline-none" />
                  <Button color="baseColorButton" className="absolute top-5 right-5 ms-5">
                    <AiOutlineSearch size={20} />
                  </Button>
                </form>
              </nav> :

              <nav className="!bg-base-color/70 !shadow-md w-full">
                <div className="flex justify-around content-start items-center justify-items-stretch px-5 py-4">
                  <Button color="baseColorButton" className={`grid gap-y-1 sm:hidden ${openMenu ? "hamburgerMenuClose" : "hamburgerMenu"}`} onClick={handleMenu}>
                    <span className={`${commonMenuCss} ${openMenu && "translate-y-[5px] rotate-45 hamburgerMenuClose"}`}>

                    </span>
                    <span className={`${commonMenuCss} ${openMenu && "opacity-0 hamburgerMenuClose"}`}>

                    </span>
                    <span className={`${commonMenuCss} ${openMenu && "-translate-y-[9px] -rotate-45 hamburgerMenuClose"}`}>

                    </span>
                  </Button>
                  <Link className="max-w-[150px] min-w-[50px]" to="/">
                    <img src={Logo} alt="Efashionia" />
                  </Link>

                  <div className="justify-center md:gap-4 lg:gap-10 px-3 hidden md:flex">
                    <Link to="/men" className="hover:opacity-50">
                      <div>Men</div>
                    </Link>
                    <Link to="/women" className="hover:opacity-50">
                      <div>Women</div>
                    </Link>
                    <Link to="/kids" className="hover:opacity-50">
                      <div>Kids</div>
                    </Link>
                    <Link to="/beauty" className="hover:opacity-50">
                      <div>Beauty</div>
                    </Link>
                  </div>
                  <div className="flex justify-center content-center items-center gap-2 md:gap-3 lg:gap-4">
                    <form className="flex flex-col items-center sm:relative sm:grid sm:ps-2 sm:pe-3">
                      <div className="sm:absolute sm:top-2 sm:left-4">
                        {
                          screenWidth.current < 640 ? <Button color="baseColorButton" onClick={() => setOpenMobileSearch(true)}>
                            <AiOutlineSearch size={20} />
                          </Button> :
                            <AiOutlineSearch size={20} />

                        }
                      </div>
                      <input type="search" placeholder="Search for products, brands, and more" className="hidden sm:grid lg:w-[350px] sm:w-[250px] sm:px-3 sm:ps-9 sm:py-[5px] sm:rounded-md focus:outline-none" />
                    </form>
                    <Dropdown className="hidden sm:block">
                      <div className="hidden sm:flex-col sm:items-center sm:w-full sm:flex">
                        <div>
                          <AiOutlineUser size={20} />
                        </div>
                        <div className="lg:block hidden">Profile</div>
                      </div>
                      <ProfileItems />
                    </Dropdown>
                    <Link to="/wishlist" className="hover:opacity-50">
                      <div className="flex flex-col items-center w-full">
                        <div>
                          <AiOutlineHeart size={20} />
                        </div>
                        <div className="hidden lg:block">Whislist</div>
                      </div>
                    </Link>
                    <Link to="/bag" className="hover:opacity-50">
                      <div className="flex flex-col items-center">
                        <div>
                          <BsBag size={20} />
                        </div>
                        <div className="hidden lg:block">Bag</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </nav>
          }
        </div>
        <MobileSidebar openMenu={openMenu} handleOpenMenu={handleMenu} />
      </header>
    </Fragment>
  )
}
Navbar.propTypes = {
  openMenu: PropTypes.node.isRequired,
  handleOpenMenu: PropTypes.node.isRequired,
};