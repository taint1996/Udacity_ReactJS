import React, { useState, createContext } from 'react';

export const ShowSearchBookContext = createContext({
  showSearchPage: false,
  handleSearchBook: () => {}
});

export const ShowSearchBookProvider = ({ children }) => {
  const [showSearchPage, setShowSearchPage] = useState(false);

  const handleSearchBook = () => {
    setShowSearchPage(!showSearchPage);
    return;
  };

  return (
    <ShowSearchBookContext.Provider
      value={{
        showSearchPage,
        handleSearchBook
      }}
    >
      {children}
    </ShowSearchBookContext.Provider>
  );
};
