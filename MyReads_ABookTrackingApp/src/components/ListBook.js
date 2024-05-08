import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShowSearchBookContext } from '../context/ShowSearchBook';
import { SearchBookContext } from '../context/SearchBook';
import { BookContext } from '../context/Book';
import { BookShelf } from './BookShelf';

export const ListBook = () => {
  const { fetchAllBooks, shelfBooks, handleChangeSelectShelf } =
    useContext(BookContext);
  const { showSearchPage } = useContext(ShowSearchBookContext);
  const { handleSearchBook } = useContext(SearchBookContext);

  const BOOK_SHELF_LIST = ['Currently Reading', 'Want To Read', 'Read'];

  useEffect(() => {
    fetchAllBooks();
  }, [showSearchPage]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {BOOK_SHELF_LIST.map((shelf, shelfIdx) => {
            return (
              <BookShelf
                key={`shelf-${shelfIdx}`}
                shelfTitle={shelf}
                shelfBooks={shelfBooks(shelf)}
                handleChangeSelectShelf={handleChangeSelectShelf}
                showSearchPage={showSearchPage}
              />
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" onClick={handleSearchBook}>
          add a book
        </Link>
      </div>
    </div>
  );
};
