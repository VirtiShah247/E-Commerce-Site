import { useState } from 'react';
import PropTypes from "prop-types";
import { useEffect } from 'react';
import { Button } from '../utils/Button';
import { useRef } from 'react';

export const Dropdown = ({ children, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
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

  }, [isOpen]);

 
  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      <Button color="baseColorButton" onClick={() => setIsOpen(!isOpen)} className={`rounded-none ${isOpen && "border-b-[3px] border-pink"}`}>
        {children[0]}
      </Button>
      {isOpen && (
        <div className="origin-top-right absolute -right-28 mt-2 w-72 rounded-md shadow-lg bg-base-color ring-1 ring-black ring-opacity-5 z-10">
          <div  className="py-1" >
            {children[1]}
          </div>
        </div>
      )}
    </div>
  );
}
Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    props: PropTypes.node.isRequired,
};