import React from "react";
import "./paginado.modules.css";
export default function Paginado({setMax, setMin, countryPerPage, dogss, pagination }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(dogss / countryPerPage)-1; i++) {
    pageNumber.push(i+1);
  }
function handlePag(number){
    setMax(9 + (10*number));
    setMin(0 + (10*number));
}
  
  return (
    <nav className="containeru">
      <div>
      <ul className="paginado">
        {pageNumber && 
        pageNumber.map(number => (
           <button key={number} onClick={() => handlePag(number)}className="linkss">

             {number}
       
           </button>
          ))}
          
      </ul>
      </div>
      </nav>
  );
}