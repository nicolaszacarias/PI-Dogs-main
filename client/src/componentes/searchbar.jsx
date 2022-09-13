import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchDog } from '../store/actions';
import React from 'react';
import "./searchbar.modules.css";
export default function SearchBar() {
    const [search, setSearch] = useState("")
    let dispatch = useDispatch()
    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchDog(search))

    }
    function onInputChange(e) {
        setSearch(e.target.value)
    }
  return <div>
      <form className='searchContainer' onSubmit={onSubmit}>
        <div className="searchBox">
      <input className='searchInput' placeholder="Search..." type="text" onChange={onInputChange} value={search}/>
      <input className="searchButton" type="submit" value="Buscar" />
      </div>    
      </form>


  </div>
};
