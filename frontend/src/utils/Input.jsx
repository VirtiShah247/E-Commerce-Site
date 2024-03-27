import PropTypes from "prop-types";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";
const input = tv({
    slots: {
        base: `peer bg-transparent outline outline-0 focus:outline-0 focus:border-2 disabled:bg-pink 
        disabled:border-0 transition-all placeholder-shown:border-2 
        placeholder-shown:border-dark-yellow border-2  border-t-transparent 
        border-brown focus:border-t-transparent p-4 rounded-md w-[270px] lg:w-[350px]`,
        label: `flex w-[270px]  md:w-[350px] select-none pointer-events-none absolute left-0 font-normal
        !overflow-visible truncate leading-tight peer-focus:leading-tight 
        peer-disabled:text-transparent  transition-all -top-1.5  before:content[' '] before:block
        before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 
        peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
        peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 
        before:pointer-events-none before:transition-all peer-disabled:before:border-transparent 
        after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 
        after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent 
        after:rounded-tr-md after:border-t-2 peer-focus:after:border-t-2 after:border-r 
        peer-focus:after:border-r-2 after:pointer-events-none after:transition-all 
        peer-disabled:after:border-transparent peer-placeholder-shown:leading-[5] 
        peer-focus:text-brown text-sm 
        peer-focus:before:!border-dark-yellow after:border-1 after:border-brown 
        peer-focus:after:!border-dark-yellow  before:border-brown`
    }
})
const {base, label} = input();
export const Input = forwardRef(function Input({ labelName, ...props }, ref){

    return (
        <div className="relative justify-self-center sm:justify-self-start">
            <input ref={ref}  {...props}
                className={base()} />
            <label
                className={label()}>
                {labelName}
            </label>
        </div>
    )
})

Input.propTypes = {
    labelName: PropTypes.node.isRequired,
};

