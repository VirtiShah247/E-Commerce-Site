import { useState } from 'react';
import PropTypes from "prop-types";
import { useRef } from 'react';
import { useEffect } from 'react';

export const Dropdown = ({ children }) =>{
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const handleClickOutside = (event) => {
        if(ref.current && !ref.current.contains(event.target)){
            setIsOpen(false);
        }
    }
    if(isOpen){
        document.addEventListener("mousedown",handleClickOutside);
    }
    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [isOpen])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="hover:opacity-50">
        {children[0]}
      </button>
      {isOpen && (
        <div className="absolute -right-8 sm:-right-14 mt-0 w-20 sm:w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" >
            {children[1]}
          </div>
        </div>
      )}
    </div>
  );
}
Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
};