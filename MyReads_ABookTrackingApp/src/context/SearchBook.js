import React, { useState, createContext } from 'react';
import { search, update } from '../BooksAPI';

export const SearchBookContext = createContext(null);

export const SearchBookProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBooks, setSearchBooks] = useState([]);

  const handleSearchBook = async () => {
    const resultSearch = await search(searchText);
    const matchCondition = searchText.length > 0 && Array.isArray(resultSearch);

    const result = matchCondition
      ? resultSearch.filter((res) => {
          return (
            res.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            res.authors
              .join(', ')
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) !== -1
          );
        })
      : [];

    setSearchBooks(result);
    return result;
  };

  const handleChangeSelectShelf = async (opt, book) => {
    try {
      book.shelf = opt;
      const updateShelf = await update(book, opt);
      return updateShelf;
    } catch (e) {
      console.log(`Error when change select shelf ${e}`);
    }
  };

  return (
    <SearchBookContext.Provider
      value={{
        searchText,
        setSearchText,
        searchBooks,
        handleSearchBook,
        handleChangeSelectShelf
      }}
    >
      {children}
    </SearchBookContext.Provider>
  );
};
