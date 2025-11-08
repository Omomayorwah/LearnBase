import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import '../styles/search.css';

const SearchInput = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Optional: trigger search on every keystroke
    // onSearch(value.trim());
  };

  return (
    <div className={`search-container ${isFocused ? 'focused' : ''}`}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
