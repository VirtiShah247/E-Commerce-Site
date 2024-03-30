import { Fragment } from "react"
import Logo from "../assets/logo1.png";
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
export const Navbar = () => {
  return (
    <Fragment>
      <header>
        <div className="bg-off-white text-brown">
          <nav className="flex justify-around items-center px-5 py-5">
            <div className="bg-pink">
              <img src={Logo} alt="Efashionia" className="object-cover w-full h-full"/>
            </div>
            <div className="flex justify-center gap-5 lg:gap-10 px-3 ">
                <div>Men</div>
                <div>Women</div>
                <div>Kids</div>
                <div>Beauty</div>

            </div>
            <form className="relative grid ps-2 pe-3">
              <div className="absolute top-2 left-5">
                <AiOutlineSearch size={20}/>
              </div>
              <input type="search" placeholder="Search for products, brands, and more" className="w-[350px] px-3 ps-9 py-[5px] rounded-md "/>
            </form>
            <div className="flex justify-center gap-3 ">
              <div className="flex flex-col items-center">
                <AiOutlineUser  />
               <div>Profile</div>
              </div>
              <div className="flex flex-col  items-center">
              <AiOutlineHeart />
               <div>Wishlist</div>
              </div>
              <div className="flex flex-col items-center">
              <BsBag />
               <div>Bag</div>
              </div>
            </div>


          </nav>
        </div>
      </header>
    </Fragment>
  )
}
