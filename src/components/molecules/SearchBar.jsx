import React, { useState } from 'react';
import Input from '../atoms/Input.jsx';
import Boton from '../atoms/Boton.jsx';
import '../../styles/molecules/SearchBar.css'

function SearchBar({ onSearch, className = "molecule-searchbar" }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchbar-input"
      />
      <Boton type="submit" className="btn-search">
        Buscar
      </Boton>
    </form>
  );
}

export default SearchBar;