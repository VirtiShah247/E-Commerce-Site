import { Fragment } from "react"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const MobileSidebar = ({ openMenu }) => {
    return (
        <Fragment>
            <aside className={`${openMenu ? "!bg-dull-pink w-[250px] h-full absolute p-5 pt-[40px] m-0 mt-[80px] left-0 top-0 z-2 animate-[300ms_ease_0s_1_slideInFromLeft]" : "hidden"}`}>
                <Link to="/men"  className="hover:text-pink">
                    <div>Men</div>
                </Link>
                <Link to="/women"  className="hover:text-pink">
                    <div>Women</div>
                </Link>
                <Link to="/kids"  className="hover:text-pink">
                    <div>Kids</div>
                </Link>
                <Link to="/beauty"  className="hover:text-pink">
                    <div>Beauty</div>
                </Link>
            </aside>
        </Fragment>
    )
}
MobileSidebar.propTypes = {
    openMenu: PropTypes.node.isRequired,
};
