import React from 'react';
import { BookList } from './BookList';

export const BookShelf = ({
  shelfTitle,
  shelfBooks,
  handleChangeSelectShelf,
  showSearchPage
}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <BookList
            books={shelfBooks}
            onHandleChangeSelectShelf={handleChangeSelectShelf}
            showSearchPage={showSearchPage}
          />
        </ol>
      </div>
    </div>
  );
};
