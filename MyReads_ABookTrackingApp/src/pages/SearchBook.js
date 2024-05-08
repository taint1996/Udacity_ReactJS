import React, { useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookList } from '../components/BookList';
import { SearchBookContext } from '../context/SearchBook';

export const SearchBook = () => {
  const {
    showSearchPage,
    handleSearchBook,
    searchText,
    setSearchText,
    searchBooks,
    handleChangeSelectShelf
  } = useContext(SearchBookContext);

  useEffect(() => {
    if (searchText) {
      handleSearchBook();
    }
  }, [searchText]);

  const renderSearchBooks = useMemo(() => {
    if (searchText.length > 0 && searchBooks.length === 0) {
      return <h3>Your search did not match any items. Please try again.</h3>;
    }

    return (
      searchBooks &&
      searchText.length > 0 && (
        <>
          <BookList
            books={searchBooks}
            showSearchPage={showSearchPage}
            onHandleChangeSelectShelf={handleChangeSelectShelf}
          />
        </>
      )
    );
  }, [searchBooks, searchText]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" onClick={handleSearchBook} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={searchText}
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{renderSearchBooks}</ol>
      </div>
    </div>
  );
};
