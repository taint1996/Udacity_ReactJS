import React from 'react';
import { BookItem } from './BookItem';

export const BookList = ({
  books,
  onHandleChangeSelectShelf,
  showSearchPage
}) => {
  return (
    <>
      {books.map((book, idx) => {
        return (
          <li key={`${book.id}-${idx}`}>
            <BookItem
              book={book}
              onHandleChangeSelectShelf={onHandleChangeSelectShelf}
              showSearchPage={showSearchPage}
            />
          </li>
        );
      })}
    </>
  );
};
