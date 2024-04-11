import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const links = tv({
    base: "underline",
    variants: {
        color: {
            offWhiteLink: "text-off-white",
            lightPinkLink: "text-light-pink",
            darkPinkLink: "text-dark-pink",
            pinkLink: "text-pink",
            brownishYellowLink: "text-brownish-yellow",
            darkYellowLink: "text-dark-yellow",
            brownLink: "text-brown"
        },
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-xl"
        }
    }

})
export const Links = forwardRef(function Links({color, size, className, children, ...props}, ref){
  return (
    <Link ref={ref} className={links({color, size, className})}  {...props}>
        {children}
    </Link>
  )
})
Links.propTypes = {
    size: PropTypes.node.isRequired,
    color: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};
