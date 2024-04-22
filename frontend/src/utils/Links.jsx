import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const links = tv({
    base: "underline",
    variants: {
        color: {
            baseColorLink: "text-base-color",
            primaryColorLink: "text-primary-color",
            secondaryColorLink: "text-secondary-color",
            activeStateColorLink: "text-active-state-color",
            foregroundColorLink: "text-foreground-color",
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
