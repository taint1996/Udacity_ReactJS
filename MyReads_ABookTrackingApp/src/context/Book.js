import React, { createContext, useState } from 'react';
import { getAll, update } from '../BooksAPI';

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      const allBooks = await getAll();
      setBooks(allBooks);
    } catch (e) {
      console.log(`Error when get all books ${e}`);
    }
  };

  const shelfBooks = (shelf) => {
    return books.filter(
      (book) =>
        book.shelf.toLowerCase() === shelf.toLowerCase().replace(/\s+/g, '')
    );
  };

  const handleChangeSelectShelf = async (opt, book) => {
    try {
      const updateShelf = await update(book, opt);
      book.shelf = opt;
      setBooks([...books]);

      return updateShelf;
    } catch (e) {
      console.log(`Error when change select shelf ${e}`);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        fetchAllBooks,
        shelfBooks,
        handleChangeSelectShelf
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
