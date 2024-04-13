import { forwardRef } from "react"
import { tv } from "tailwind-variants"
import PropTypes from "prop-types";

const forms = tv({
    base: "grid justify-center",
    variants: {
        size: {
            md: "gap-5 mt-[50px]",
        }
    }
})
export const Form = forwardRef(function Form({size, className, children, ...props}, ref){
  return (
    <form ref={ref} className={forms({size, className})} {...props}>
        {children}
    </form>
  )
})
Form.propTypes = {
    size: PropTypes.node.isRequired,
    color: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  };
