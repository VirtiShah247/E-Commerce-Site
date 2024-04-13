import { Fragment, useEffect, useRef } from "react"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ProfileItems } from "./ProfileItems";

export const MobileSidebar = ({ openMenu, handleOpenMenu }) => {
    const ref = useRef();
    const handleCloseMenu = (event) => {
        if(ref.current && !ref.current.contains(event.target)){
            handleOpenMenu(false);
        }
    }
    useEffect(()=>{
        if(openMenu){
            document.addEventListener("mousedown", handleCloseMenu);
        }
        return ()=>{
            document.removeEventListener("mousedown", handleCloseMenu);
        }
    },[openMenu]);
    return (
        <Fragment>
            <aside ref = {ref} className={`${openMenu ? "!bg-dull-pink w-[250px] h-full absolute p-5 pt-[40px] m-0 mt-[57px] left-0 top-0 z-2 animate-[300ms_ease_0s_1_slideInFromLeft]" : "hidden"}`}>
                <div>
                    <Link to="/men"  className="hover:opacity-50">
                        <div>Men</div>
                    </Link>
                    <Link to="/women"  className="hover:opacity-50">
                        <div>Women</div>
                    </Link>
                    <Link to="/kids"  className="hover:opacity-50">
                        <div>Kids</div>
                    </Link>
                    <Link to="/beauty"  className="hover:opacity-50">
                        <div>Beauty</div>
                    </Link>
                </div>
                <hr className="border-t-2 border-gray-400 text-opacity-100 my-2"/>
                <div>
                    <ProfileItems />
                </div>
            </aside>
        </Fragment>
    )
}
MobileSidebar.propTypes = {
    openMenu: PropTypes.node.isRequired,
    handleOpenMenu: PropTypes.node.isRequired,
};
