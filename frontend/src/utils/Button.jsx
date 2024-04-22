import { tv } from "tailwind-variants";
import PropTypes from "prop-types";
import { forwardRef } from "react";
const button = tv({
    base: "rounded-md grid justify-center content-center",
    variants: {
        color: {
            baseColorButton: "bg-base-color text-foreground-color",
            primaryColorButton: "bg-primary-color text-base-color",
            secondaryColorButton: "bg-secondary-color text-foreground-color",
            foregroundColorButton: "bg-foreground-color text-base-color",
            activeStateColorButton: "bg-actibe-state-color text-foreground-color",

        },
        disabled: {
            true: "opacity-50 cursor-not-allowed"
        },
        size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-xl",
        }
    },
    defaultVariants: {
        size: "md",
        color: "primaryColorButton"
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