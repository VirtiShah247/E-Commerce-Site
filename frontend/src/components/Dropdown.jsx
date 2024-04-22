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
        console.log(event.target);
        console.log("ref: " + ref.current.contains(event.target));
        console.log(children[1].props);
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

  // useEffect(()=>{
  //   const handleClickInside = () => {
  //     setIsOpen(false);
  //   }
  //   if(isOpen){
  //     const childButtons = children[1].props.querySelectorAll("button");
  //     const childLinks = children[1].querySelectorAll("a");

  //     childButtons.forEach(button => button.addEventListener(handleClickInside));
  //     childLinks.forEach(link => link.addEventListener(handleClickInside));

  //     return () => {
  //       childButtons.forEach(button => button.removeEventListener(handleClickInside));
  //       childLinks.forEach(link => link.removeEventListener(handleClickInside));
  //   }
  //   }
   
  // },[isOpen]);
 
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