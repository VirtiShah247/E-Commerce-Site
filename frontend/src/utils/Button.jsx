import { tv } from "tailwind-variants";
import PropTypes from "prop-types";
import { forwardRef } from "react";
const button = tv({
    base: "p-3 w-[200px] h-[50px] rounded-md grid justify-center content-center",
    variants: {
        color: {
            offWhiteButton: "bg-off-white text-brown",
            lightPinkButton: "bg-light-pink text-brown",
            darkPinkButton: "bg-dark-pink text-off-white",
            pinkButton: "bg-pink text-off-white",
            brownishYellowButton: "bg-brownish-yellow text-off-white",
            darkYellowButton: "bg-dark-yellow text-off-white",
            brownButton: "bg-brown text-off-white"

        },
        disabled: {
            true: "opacity-50 cursor-not-allowed"
        },
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-xl",
        }
    },
    defaultVariants: {
        size: "md",
        color: "darkYellowButton"
    }
})
export const Button = forwardRef(function Button({ size, color, disabled, className, children, ...props }, ref) {
    return (
        <button type="button" ref={ref} className={button({ color, size, disabled, className })} {...props}>
            {children}
        </button>
    )
})
Button.propTypes = {
    size: PropTypes.node.isRequired,
    color: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.node.isRequired,
};