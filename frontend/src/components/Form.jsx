// import React from 'react'
import PropTypes from "prop-types";

const Form = ({componentName}) => {
  return (
    <form className="grid gap-6 mt-[50px]">
        <input type="text" required placeholder="Enter phone number or email id" className={`p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--dark-yellow]`}/>
        <input type="password" required placeholder="Enter password" className={`p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--dark-yellow]`}/>
        <button className="p-3 w-[150px] bg-[--dark-yellow] text-[--off-white] rounded-md">{componentName}</button>
    </form>
  )
}

Form.propTypes = {
    componentName: PropTypes.node.isRequired,
};

export default Form