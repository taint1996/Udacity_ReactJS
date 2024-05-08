import React from 'react';
import { Select } from './Select';

export const BookItem = ({
  book,
  onHandleChangeSelectShelf,
  showSearchPage
}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`
          }}
        ></div>
        <div className="book-shelf-changer">
          <Select
            showSearchPage={showSearchPage}
            onHandleChangeSelectShelf={onHandleChangeSelectShelf}
            book={book}
          />
        </div>
      </div>
      <div className="book-title">{book?.title}</div>
      <div className="book-authors">{book.authors?.join(', ')}</div>
    </div>
  );
};
