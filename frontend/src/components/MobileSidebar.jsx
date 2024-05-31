import { Fragment, useEffect, useRef } from "react"
import PropTypes from "prop-types";

export const MobileSidebar = ({ openMenu, handleOpenMenu, children }) => {
    const ref = useRef();

    useEffect(() => {
        const handleCloseMenu = (event) => {
            if (ref.current && !ref.current.contains(event.target) && !event.target.classList.contains("hamburgerMenuClose")) {
                handleOpenMenu(!openMenu);
            }
        }
        if (openMenu) {
            document.addEventListener("mousedown", handleCloseMenu);
        }
        return () => {
            document.removeEventListener("mousedown", handleCloseMenu);
        }
    }, [openMenu]);
    return (
        <Fragment>
            <aside ref={ref} className={`${openMenu ? "!bg-base-color !z-10 w-[250px] absolute p-5 pt-[40px] m-0 mt-[57px] left-0 top-0 z-2 animate-[300ms_ease_0s_1_slideInFromLeft]" : "hidden"}`}>
                {children}
            </aside>
        </Fragment>
    )
}
MobileSidebar.propTypes = {
    openMenu: PropTypes.node.isRequired,
    handleOpenMenu: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};
