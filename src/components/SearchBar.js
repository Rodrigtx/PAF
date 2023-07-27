// SearchBar.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/recipesSlice';

const SearchBar = ({ onSearch }) => { // Recibimos la función `onSearch` como prop
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      onSearch(null);
    } else {
      dispatch(fetchRecipes(value));
    }
  };

  return (
      <input id="buscar" type="text" value={searchTerm} onChange={handleInputChange} />
  );
};

export default SearchBar;
