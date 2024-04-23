import { Fragment, forwardRef } from "react";
import { tv } from "tailwind-variants";
import PropTypes from "prop-types";

const container = tv({
    base: "width-[100%] my-0 mx-auto",
    variants: {
        size: {
            sm: "max-w-[540px]",
            md: "max-w-[720px]",
            lg: "max-w-[960px]",
            xl: "max-w-[1140px]",
            fluid: "max-w-[100%]",
        }
    },
    defaultVariants: {
        size: "fluid"
    }
})

export const Container = forwardRef(function Container({size, className, children, ...props}, ref){
  return (
    <Fragment>
        <div ref={ref} className={container({size,className})} {...props}>
            {children}
        </div>
    </Fragment>
  )
})
Container.propTypes = {
    size: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};
