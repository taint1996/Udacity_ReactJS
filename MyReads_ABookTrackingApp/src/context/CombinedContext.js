import React from 'react';
import { ShowSearchBookProvider } from './ShowSearchBook';
import { SearchBookProvider } from './SearchBook';
import { BookProvider } from './Book';

export const CombinedContextProvider = ({ children }) => {
  return (
    <ShowSearchBookProvider>
      <SearchBookProvider>
        <BookProvider>{children}</BookProvider>
      </SearchBookProvider>
    </ShowSearchBookProvider>
  );
};
