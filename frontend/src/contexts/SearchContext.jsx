import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    courses: [],
    jobs: [],
    certificates: []
  });

  const performSearch = async (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults({ courses: [], jobs: [], certificates: [] });
      return;
    }

    try {
      // This would typically make API calls to search across different content types
      // For now, we'll simulate the search functionality
      console.log(`Searching for: "${term}"`);
      
      // TODO: Implement actual search API calls
      // const courses = await searchCourses(term);
      // const jobs = await searchJobs(term);
      // const certificates = await searchCertificates(term);
      
      // For demonstration, we'll set empty results
      setSearchResults({
        courses: [],
        jobs: [],
        certificates: []
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({ courses: [], jobs: [], certificates: [] });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults({ courses: [], jobs: [], certificates: [] });
  };

  const value = {
    searchTerm,
    searchResults,
    performSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
